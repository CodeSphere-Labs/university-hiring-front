import { querySync } from 'atomic-router';
import { createEvent, createStore, sample } from 'effector';
import { debounce } from 'patronum';

import type { Group } from '@/shared/api/types';

import { controls, routes } from '@/shared/routing/index';
import { chainAuthorized, chainRole } from '@/shared/session/model';

import { getGroupsQuery } from '../api/api';

const DEBOUNCE_TIMEOUT = 400;

export const currentRoute = routes.groups;
export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.signIn.open
});

export const authorizedRouteRole = chainRole(authorizedRoute, ['ADMIN', 'UNIVERSITY_STAFF'], {
  otherwise: routes.home.open
});

export const searchChanged = createEvent<string>();

export const $groups = createStore<Group[]>([]);
$groups.on(getGroupsQuery.finished.success, (_, { result }) => result);

export const $search = createStore<string>('');
$search.on(searchChanged, (_, search) => search);
export const $loading = getGroupsQuery.$pending.map((pending) => pending);

export const debouncedSearchChanged = debounce({
  source: searchChanged,
  timeout: DEBOUNCE_TIMEOUT
});

sample({
  clock: authorizedRouteRole.opened,
  source: authorizedRouteRole.$query,
  fn: (query) => ({
    search: query.search,
    withStudents: true
  }),
  target: getGroupsQuery.start
});

querySync({
  source: {
    search: $search
  },
  route: authorizedRouteRole,
  controls
});

sample({
  clock: authorizedRouteRole.opened,
  source: authorizedRouteRole.$query,
  fn: (query) => query.search,
  target: $search
});

sample({
  clock: debouncedSearchChanged,
  source: $search,
  fn: (search) => ({
    search,
    withStudents: true
  }),
  target: getGroupsQuery.start
});
