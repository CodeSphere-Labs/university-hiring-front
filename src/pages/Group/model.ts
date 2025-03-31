import { createStore, sample, createEvent } from 'effector';

import type { GroupResponse, GroupsParams } from '@/shared/api/types';

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

export const $group = createStore<GroupResponse | null>(null);
export const $loading = getGroupQuery.$pending.map((pending) => pending);
$group.on(getGroupQuery.finished.success, (_, { result }) => result);

export const $page = createStore(1);
export const $recordsPerPage = createStore(10);

export const pageChanged = createEvent<number>();
export const recordsPerPageChanged = createEvent<number>();

$page.on(pageChanged, (_, page) => page);
$recordsPerPage.on(recordsPerPageChanged, (_, recordsPerPage) => recordsPerPage);

sample({
  clock: authorizedRouteRole.opened,
  source: authorizedRouteRole.$params,
  fn: (params): GroupsParams => ({
    id: Number(params.id)
  }),
  target: getGroupQuery.start
});

sample({
  clock: [pageChanged, recordsPerPageChanged],
  source: {
    page: $page,
    recordsPerPage: $recordsPerPage,
    params: authorizedRouteRole.$params
  },
  fn: ({ page, recordsPerPage, params }): GroupsParams => ({
    id: Number(params.id),
    page,
    limit: recordsPerPage
  }),
  target: getGroupQuery.start
});
