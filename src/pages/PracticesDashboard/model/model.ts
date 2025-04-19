import { createStore, sample } from 'effector';

import type { PracticesResponse } from '@/shared/api/types';

import { routes } from '@/shared/routing';
import { chainAuthorized, chainRole } from '@/shared/session/model';
import { removeEmptyValues } from '@/shared/utils';

import { getPracticesDashboardQuery } from '../api/api';
import { $filter, filterChanged } from './filter.model';
import { $search, debouncedSearchChanged } from './search.model';

export const currentRoute = routes.practices;
export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.signIn.open
});

export const authorizedRouteRole = chainRole(
  authorizedRoute,
  ['ADMIN', 'UNIVERSITY_STAFF', 'STAFF', 'STUDENT'],
  {
    otherwise: routes.home.open
  }
);

export const $practices = createStore<PracticesResponse>({
  data: [],
  meta: {
    limit: 0,
    page: 0,
    totalItems: 0,
    totalPages: 0
  }
});
$practices.on(getPracticesDashboardQuery.finished.success, (_, { result }) => result);

export const $loading = getPracticesDashboardQuery.$pending.map((pending) => pending);

sample({
  clock: [authorizedRouteRole.opened, debouncedSearchChanged, filterChanged],
  source: {
    filter: $filter,
    search: $search
  },
  fn: ({ filter, search }) =>
    removeEmptyValues({
      filter,
      search
    }),
  target: getPracticesDashboardQuery.start
});
