import { createStore, sample } from 'effector';

import type { Group } from '@/shared/api/types';

import { routes } from '@/shared/routing/index';
import { chainAuthorized, chainRole } from '@/shared/session/model';

import { getGroupsQuery } from './api';

export const currentRoute = routes.groups;
export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.signIn.open
});

export const authorizedRouteRole = chainRole(authorizedRoute, ['ADMIN', 'UNIVERSITY_STAFF'], {
  otherwise: routes.home.open
});

export const $groups = createStore<Group[]>([]);
$groups.on(getGroupsQuery.finished.success, (_, { result }) => result);

export const $search = createStore<string>('');

export const $groupsPending = getGroupsQuery.$pending.map((pending) => pending);

sample({
  clock: authorizedRouteRole.opened,
  target: getGroupsQuery.start
});
