import { createStore, sample } from 'effector';

import type { Group } from '@/shared/api/types';

import { routes } from '@/shared/routing';
import { chainAuthorized, chainRole } from '@/shared/session/model';

import { getGroupQuery } from './api';

export const currentRoute = routes.group;
export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.signIn.open
});

export const authorizedRouteRole = chainRole(authorizedRoute, ['ADMIN', 'UNIVERSITY_STAFF'], {
  otherwise: routes.home.open
});

export const $group = createStore<Group | null>(null);
export const $loading = getGroupQuery.$pending.map((pending) => pending);
$group.on(getGroupQuery.finished.success, (_, { result }) => result);

sample({
  clock: authorizedRouteRole.opened,
  source: authorizedRouteRole.$params,
  fn: (params) => params.id,
  target: getGroupQuery.start
});
