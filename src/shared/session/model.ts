import type { RouteInstance, RouteParams, RouteParamsAndQuery } from 'atomic-router';
import type { Effect, Event } from 'effector';

import { chainRoute } from 'atomic-router';
import { combine, createEvent, createStore, sample } from 'effector';

import type { Role, User } from '@/shared/api/types';

import { updateUserQuery } from '@/pages/Profile/api/api';
import { showError } from '@/shared/notifications/model';
import { logoutQuery, sessionQuery } from '@/shared/session/api';

enum AuthStatus {
  Initial,
  Pending,
  Anonymous,
  Authenticated
}

export const $user = createStore<User | null>(null, { name: 'user info' });
export const $sessionPending = combine(sessionQuery.$pending, (sessionPending) => sessionPending);
const $authenticationStatus = createStore(AuthStatus.Initial);

export const userLogouted = createEvent();

// Логика обработки аутентификации:
// 1. При первом запросе статус Initial -> Pending
// 2. При успешном запросе статус -> Authenticated
// 3. При успешном обновлении токена статус -> Authenticated и запускается sessionQuery
// 4. При ошибке обновления токена статус -> Anonymous

$authenticationStatus.on(sessionQuery.$succeeded, (status) => {
  if (status === AuthStatus.Initial) return AuthStatus.Pending;
  return status;
});

$user.on(sessionQuery.$data, (_, user) => user);
$user.on(updateUserQuery.finished.success, (_, { result }) => result);

$authenticationStatus.on(sessionQuery.finished.success, () => AuthStatus.Authenticated);

sample({
  clock: userLogouted,
  source: $user,
  filter: (user) => user !== null,
  fn: (user) => user!.id,
  target: logoutQuery.start
});

$authenticationStatus.on(logoutQuery.finished.success, () => AuthStatus.Anonymous);
$user.on(logoutQuery.finished.success, () => null);

sample({
  clock: logoutQuery.finished.success,
  target: sessionQuery.start
});

sample({
  clock: logoutQuery.finished.failure,
  target: showError('Ошибка при попытке выйти')
});

// eslint-disable-next-line unused-imports/no-unused-vars
interface ChainParams<Params extends RouteParams> {
  otherwise?: Effect<void, any, any> | Event<void>;
}

/**
 * Функция для защиты маршрутов, требующих аутентификации
 *
 * Логика работы:
 * 1. При переходе на маршрут проверяется статус аутентификации
 * 2. Если пользователь уже аутентифицирован, маршрут открывается
 * 3. Если статус Initial, запускается sessionQuery
 * 4. Если sessionQuery завершается успешно, маршрут открывается
 * 5. Если sessionQuery завершается с ошибкой, маршрут не открывается и выполняется otherwise
 */
export function chainAuthorized<Params extends RouteParams>(
  route: RouteInstance<Params>,
  { otherwise }: ChainParams<Params> = {}
): RouteInstance<Params> {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const sessionReceivedAnonymous = createEvent<RouteParamsAndQuery<Params>>();

  const alreadyAuthenticated = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Authenticated
  });

  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Anonymous
  });

  sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Initial,
    target: sessionQuery.start
  });

  sample({
    clock: [alreadyAnonymous, sessionQuery.finished.failure],
    source: { params: route.$params, query: route.$query },
    filter: route.$isOpened,
    target: sessionReceivedAnonymous
  });

  if (otherwise) {
    sample({
      clock: sessionReceivedAnonymous,
      target: otherwise as Effect<void, any, any>
    });
  }

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAuthenticated, sessionQuery.finished.success],
    cancelOn: sessionReceivedAnonymous
  });
}

/**
 * Функция для защиты маршрутов, доступных только неаутентифицированным пользователям
 *
 * Логика работы:
 * 1. При переходе на маршрут проверяется статус аутентификации
 * 2. Если пользователь не аутентифицирован, маршрут открывается
 * 3. Если статус Initial, запускается sessionQuery
 * 4. Если sessionQuery завершается с ошибкой, маршрут открывается
 * 5. Если sessionQuery завершается успешно, маршрут не открывается и выполняется otherwise
 */
export function chainAnonymous<Params extends RouteParams>(
  route: RouteInstance<Params>,
  { otherwise }: ChainParams<Params> = {}
): RouteInstance<Params> {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const sessionReceivedAuthenticated = createEvent<RouteParamsAndQuery<Params>>();

  const alreadyAuthenticated = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Authenticated
  });

  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Anonymous
  });

  sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Initial,
    target: sessionQuery.start
  });

  sample({
    clock: [alreadyAuthenticated, sessionQuery.finished.success],
    source: { params: route.$params, query: route.$query },
    filter: route.$isOpened,
    target: sessionReceivedAuthenticated
  });

  if (otherwise) {
    sample({
      clock: sessionReceivedAuthenticated,
      target: otherwise as Effect<void, any, any>
    });
  }

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAnonymous, sessionQuery.finished.failure],
    cancelOn: sessionReceivedAuthenticated
  });
}

export function chainRole<Params extends RouteParams>(
  route: RouteInstance<Params>,
  roles: Role[],
  { otherwise }: ChainParams<Params> = {}
): RouteInstance<Params> {
  const roleCheckStarted = createEvent<RouteParamsAndQuery<Params>>();

  sample({
    clock: route.opened,
    target: roleCheckStarted
  });

  const roleCheckSuccess = sample({
    clock: roleCheckStarted,
    source: $user,
    filter: (user) => user !== null && roles.includes(user.role)
  });

  const roleCheckFailure = sample({
    clock: roleCheckStarted,
    source: $user,
    filter: (user) => user !== null && !roles.includes(user.role)
  });

  if (otherwise) {
    sample({
      clock: roleCheckFailure,
      target: otherwise as Effect<void, any, any>
    });
  }

  return chainRoute({
    route,
    beforeOpen: roleCheckStarted,
    openOn: [roleCheckSuccess],
    cancelOn: roleCheckFailure
  });
}
