import { combine, createEvent, createStore, sample } from 'effector';

import type { OpportunitiesResponse, Opportunity } from '@/shared/api/types';

import { routes } from '@/shared/routing/index';
import { chainAuthorized, chainRole } from '@/shared/session/model';

import { getOpportunitiesMoreQuery, getOpportunitiesQuery } from '../api/api';
import { $search, debouncedSearchChanged } from './search';

export const currentRoute = routes.internshipDashboard;
export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.signIn.open
});

export const authorizedRouteRole = chainRole(authorizedRoute, ['ADMIN', 'STAFF'], {
  otherwise: routes.home.open
});

export const endOfOpportunitiesReached = createEvent();

const $page = createStore(1);
$page.on(getOpportunitiesMoreQuery.finished.success, (_, { result }) => result.meta.page);

export const $opportunities = createStore<Opportunity[]>([]);
export const $opportunitiesResponse = createStore<OpportunitiesResponse | null>(null);

export const $opportunitiesLoading = getOpportunitiesQuery.$pending.map(Boolean);
export const $opportunitiesMoreLoading = getOpportunitiesMoreQuery.$pending.map(Boolean);

export const $loading = combine(
  $opportunitiesLoading,
  $opportunitiesMoreLoading,
  (initLoading, moreLoading) => initLoading || moreLoading
);

$opportunities.on(getOpportunitiesQuery.finished.success, (_, { result }) => result.data);
$opportunities.on(getOpportunitiesMoreQuery.finished.success, (store, { result }) => [
  ...store,
  ...result.data
]);

$opportunitiesResponse.on(getOpportunitiesQuery.finished.success, (_, { result }) => result);
$opportunitiesResponse.on(getOpportunitiesMoreQuery.finished.success, (_, { result }) => result);

sample({
  clock: authorizedRouteRole.opened,
  fn: () => ({ withResponses: true }),
  target: getOpportunitiesQuery.start
});

sample({
  clock: endOfOpportunitiesReached,
  source: {
    search: $search,
    meta: $opportunitiesResponse,
    loading: $opportunitiesLoading,
    page: $page
  },
  filter: ({ loading, meta, page }) => !loading && page < (meta?.meta.totalPages ?? 1),
  fn: ({ page, search }) => ({ withResponses: true, page: page + 1, search }),
  target: getOpportunitiesMoreQuery.start
});

sample({
  clock: debouncedSearchChanged,
  source: {
    search: $search
  },
  fn: ({ search }) => ({ withResponses: true, search }),
  target: getOpportunitiesQuery.start
});
