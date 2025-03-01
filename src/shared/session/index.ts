import { createQuery } from '@farfetched/core'
import {
  chainRoute,
  RouteInstance,
  RouteParams,
  RouteParamsAndQuery,
} from 'atomic-router'
import { createEvent, createStore, Effect, Event, sample } from 'effector'

import { createCommonRequestFx } from '@/shared/api/requests'
import { User } from '@/shared/api/types'

enum AuthStatus {
  Initial,
  Pending,
  Anonymous,
  Authenticated,
}

export const sessionQuery = createQuery({
  effect: createCommonRequestFx<void, User>({
    url: '/users/profile',
  }),
})

export const $user = createStore<User | null>(null)
const $authenticationStatus = createStore(AuthStatus.Initial)

$authenticationStatus.on(sessionQuery.$succeeded, (status) => {
  if (status === AuthStatus.Initial) return AuthStatus.Pending
  return status
})

$user.on(sessionQuery.$data, (_, user) => user)
$authenticationStatus.on(
  sessionQuery.finished.success,
  () => AuthStatus.Authenticated,
)

$authenticationStatus.on(
  sessionQuery.finished.failure,
  () => AuthStatus.Anonymous,
)

interface ChainParams<Params extends RouteParams> {
  otherwise?: Event<void> | Effect<void, any, any>
}

export function chainAuthorized<Params extends RouteParams>(
  route: RouteInstance<Params>,
  { otherwise }: ChainParams<Params> = {},
): RouteInstance<Params> {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>()
  const sessionReceivedAnonymous = createEvent<RouteParamsAndQuery<Params>>()

  const alreadyAuthenticated = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Authenticated,
  })

  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Anonymous,
  })

  sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Initial,
    target: sessionQuery.start,
  })

  sample({
    clock: [alreadyAnonymous, sessionQuery.finished.failure],
    source: { params: route.$params, query: route.$query },
    filter: route.$isOpened,
    target: sessionReceivedAnonymous,
  })

  if (otherwise) {
    sample({
      clock: sessionReceivedAnonymous,
      target: otherwise as Effect<void, any, any>,
    })
  }

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAuthenticated, sessionQuery.finished.success],
    cancelOn: sessionReceivedAnonymous,
  })
}

export function chainAnonymous<Params extends RouteParams>(
  route: RouteInstance<Params>,
  { otherwise }: ChainParams<Params> = {},
): RouteInstance<Params> {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>()
  const sessionReceivedAuthenticated =
    createEvent<RouteParamsAndQuery<Params>>()

  const alreadyAuthenticated = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Authenticated,
  })

  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Anonymous,
  })

  sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Initial,
    target: sessionQuery.start,
  })

  sample({
    clock: [alreadyAuthenticated, sessionQuery.finished.success],
    source: { params: route.$params, query: route.$query },
    filter: route.$isOpened,
    target: sessionReceivedAuthenticated,
  })

  if (otherwise) {
    sample({
      clock: sessionReceivedAuthenticated,
      target: otherwise as Effect<void, any, any>,
    })
  }

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAnonymous, sessionQuery.finished.failure],
    cancelOn: sessionReceivedAuthenticated,
  })
}
