import { createStore, sample } from 'effector';

import type { OpportunityResponse } from '@/shared/api/types';

import { routes } from '@/shared/routing';
import { chainAuthorized, chainRole } from '@/shared/session/model';

import { getInternshipDashboardCardQuery } from './api';

export const currentRoute = routes.internshipDashboardCard;
export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.signIn.open
});

export const authorizedRouteRole = chainRole(authorizedRoute, ['ADMIN', 'STAFF'], {
  otherwise: routes.home.open
});

export const $opportinity = createStore<OpportunityResponse | null>(null);
export const $loading = getInternshipDashboardCardQuery.$pending.map((pending) => pending);

$opportinity.on(getInternshipDashboardCardQuery.finished.success, (_, { result }) => result);

sample({
  clock: authorizedRouteRole.opened,
  source: authorizedRouteRole.$params,
  fn: (params) => params.id,
  target: getInternshipDashboardCardQuery.start
});
