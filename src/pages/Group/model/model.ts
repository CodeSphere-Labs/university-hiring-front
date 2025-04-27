import { querySync, redirect } from 'atomic-router';
import { combine, createEvent, createStore, sample } from 'effector';

import type { GroupResponse, GroupsParams } from '@/shared/api/types';

import { controls, routes } from '@/shared/routing';
import { chainAuthorized, chainRole } from '@/shared/session/model';

import { getGroupQuery, getInitialGroupQuery } from '../api/api';
import { $search, debouncedSearchChanged } from './search';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export const currentRoute = routes.group;
export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.signIn.open
});

export const authorizedRouteRole = chainRole(authorizedRoute, ['ADMIN', 'UNIVERSITY_STAFF'], {
  otherwise: routes.home.open
});

export const goProfilePressed = createEvent<string>();
redirect({
  clock: goProfilePressed,
  route: routes.usersProfile,
  params: (id) => ({ id })
});

export const $group = createStore<GroupResponse | null>(null);
export const $initialGroupLoading = getInitialGroupQuery.$pending.map((pending) => pending);
export const $groupLoading = combine(
  $initialGroupLoading,
  getGroupQuery.$pending.map((pending) => pending),
  (initialLoading, pending) => initialLoading || pending
);

$group.on(getInitialGroupQuery.finished.success, (_, { result }) => result);
$group.on(getGroupQuery.finished.success, (_, { result }) => result);

export const $page = createStore(DEFAULT_PAGE);
$page.on(getGroupQuery.finished.success, (_, { result }) => result.meta.page);
export const $recordsPerPage = createStore(DEFAULT_LIMIT);

export const pageChanged = createEvent<number>();
export const recordsPerPageChanged = createEvent<number>();

$page.on(pageChanged, (_, page) => page);
$recordsPerPage.on(recordsPerPageChanged, (_, recordsPerPage) => recordsPerPage);

querySync({
  source: {
    page: $page,
    limit: $recordsPerPage,
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
  clock: authorizedRouteRole.opened,
  source: authorizedRouteRole.$query,
  fn: (query) => Number(query.page) || DEFAULT_PAGE,
  target: $page
});

sample({
  clock: authorizedRouteRole.opened,
  source: {
    params: authorizedRouteRole.$params,
    search: $search
  },
  fn: ({ params, search }): GroupsParams => ({
    id: Number(params.id),
    search
  }),
  target: getInitialGroupQuery.start
});

sample({
  clock: [pageChanged, recordsPerPageChanged, debouncedSearchChanged],
  source: {
    page: $page,
    recordsPerPage: $recordsPerPage,
    params: authorizedRouteRole.$params,
    search: $search
  },
  fn: ({ page, recordsPerPage, params, search }): GroupsParams => ({
    id: Number(params.id),
    page,
    limit: recordsPerPage,
    search
  }),
  target: getGroupQuery.start
});
