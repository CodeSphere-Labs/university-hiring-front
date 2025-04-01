import { querySync } from 'atomic-router';
import { createEvent, createStore, sample } from 'effector';

import type {
  InvintationResponse,
  InvitationFilter,
  InvitationParams,
  InvitationStatus
} from '@/shared/api/types';

import {
  $filter,
  $status,
  DEFAULT_FILTER,
  DEFAULT_STATUS,
  filterChanged,
  statusChanged
} from '@/features/Invitations/Filters/model';
import { $search, debouncedSearchChanged } from '@/features/Invitations/Search/model';
import { controls, routes } from '@/shared/routing/index';
import { $user, chainAuthorized, chainRole } from '@/shared/session/model';

import { deleteInvitationQuery, getInvitationsQuery, refreshInvitationQuery } from '../api/api';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export const currentRoute = routes.invitations;
export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.signIn.open
});

export const authorizedRouteRole = chainRole(
  authorizedRoute,
  ['ADMIN', 'UNIVERSITY_STAFF', 'STAFF'],
  {
    otherwise: routes.home.open
  }
);

export const pageChanged = createEvent<number>();
export const recordsPerPageChanged = createEvent<number>();

export const $invitations = createStore<InvintationResponse>({
  data: [],
  meta: {
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 1
  }
});
$invitations.on(getInvitationsQuery.finished.success, (_, { result }) => result);
$invitations.on(deleteInvitationQuery.finished.success, (state, { result }) => ({
  ...state,
  data: state.data.filter((invitation) => invitation.id !== result.id)
}));
$invitations.on(refreshInvitationQuery.finished.success, (state, { result }) => ({
  ...state,
  data: state.data.filter((invitation) => invitation.id !== result.id)
}));

export const $loading = getInvitationsQuery.$pending.map((pending) => pending);

export const $page = createStore(DEFAULT_PAGE);
$page.on(getInvitationsQuery.finished.success, (_, { result }) => result.meta.page);
$page.on(pageChanged, (_, page) => page);

export const $recordsPerPage = createStore(DEFAULT_LIMIT);
$recordsPerPage.on(recordsPerPageChanged, (_, recordsPerPage) => recordsPerPage);

sample({
  clock: [statusChanged, filterChanged],
  fn: () => DEFAULT_PAGE,
  target: $page
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
  source: authorizedRouteRole.$query,
  fn: (query) => Number(query.limit) || DEFAULT_LIMIT,
  target: $recordsPerPage
});

sample({
  clock: authorizedRouteRole.opened,
  source: authorizedRouteRole.$query,
  fn: (query) => (query.status as InvitationStatus) || DEFAULT_STATUS,
  target: $status
});

sample({
  clock: authorizedRouteRole.opened,
  source: authorizedRouteRole.$query,
  fn: (query) => (query.filter as InvitationFilter) || DEFAULT_FILTER,
  target: $filter
});

sample({
  clock: authorizedRouteRole.opened,
  source: {
    query: authorizedRouteRole.$query,
    user: $user
  },
  fn: ({ query, user }) => {
    const filter =
      user?.role === 'ADMIN'
        ? (query.filter as InvitationFilter) || DEFAULT_FILTER
        : DEFAULT_FILTER;
    const status = (query.status as InvitationStatus) || DEFAULT_STATUS;
    const page = Number(query.page) || DEFAULT_PAGE;
    const limit = Number(query.limit) || DEFAULT_LIMIT;
    const search = query.search;

    return { filter, status, page, limit, search } as InvitationParams;
  },
  target: getInvitationsQuery.start
});

querySync({
  source: {
    filter: $filter,
    status: $status,
    page: $page,
    limit: $recordsPerPage,
    search: $search
  },
  route: authorizedRouteRole,
  controls
});

sample({
  clock: [pageChanged, recordsPerPageChanged, filterChanged, statusChanged, debouncedSearchChanged],
  source: {
    page: $page,
    recordsPerPage: $recordsPerPage,
    filter: $filter,
    status: $status,
    search: $search
  },
  fn: ({ page, recordsPerPage, filter, status, search }) => ({
    filter,
    status,
    page,
    limit: recordsPerPage,
    search
  }),
  target: getInvitationsQuery.start
});
