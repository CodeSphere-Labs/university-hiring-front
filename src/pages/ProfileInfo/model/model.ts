import { createStore, sample } from 'effector';

import type { User } from '@/shared/api/types';

import { routes } from '@/shared/routing';
import { chainAuthorized } from '@/shared/session/model';

import { getProfileInfoQuery } from '../api/api';

export const currentRoute = routes.usersProfile;
export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.signIn.open
});

export const $user = createStore<User | null>(null);
$user.on(getProfileInfoQuery.finished.success, (_, { result }) => result);

sample({
  clock: authorizedRoute.opened,
  source: authorizedRoute.$params,
  fn: (params) => params.id,
  target: getProfileInfoQuery.start
});
