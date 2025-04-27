import { createEvent, createStore, sample } from 'effector';

import type {
  OpportunityResponse,
  OpportunityResponsesFilter,
  OpportunityResponsesResponse
} from '@/shared/api/types';

import { showError, showSuccess } from '@/shared/notifications/model';
import { routes } from '@/shared/routing';
import { chainAuthorized, chainRole } from '@/shared/session/model';

import {
  changeInternshipDashboardCardResponseStatusQuery,
  getInternshipDashboardCardQuery,
  getInternshipDashboardCardResponsesQuery
} from '../api/api';

export const currentRoute = routes.internshipDashboardCard;
export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.signIn.open
});

export const authorizedRouteRole = chainRole(authorizedRoute, ['ADMIN', 'STAFF'], {
  otherwise: routes.home.open
});

export const pageChanged = createEvent<number>();
export const filterChanged = createEvent<OpportunityResponsesFilter>();
export const responseStatusChanged = createEvent<{
  id: number;
  status: OpportunityResponsesFilter;
}>();

export const $page = createStore(1);
$page.on(pageChanged, (_, page) => page);
$page.on(
  getInternshipDashboardCardResponsesQuery.finished.success,
  (_, { result }) => result.meta.page
);

export const $status = createStore<OpportunityResponsesFilter>('WAITING');
$status.on(filterChanged, (_, status) => status);

export const $opportinity = createStore<OpportunityResponse | null>(null);
$opportinity.on(getInternshipDashboardCardQuery.finished.success, (_, { result }) => result);

export const $opportinityLoading = getInternshipDashboardCardQuery.$pending.map(
  (pending) => pending
);

export const $responses = createStore<OpportunityResponsesResponse>({
  data: [],
  meta: {
    page: 0,
    limit: 10,
    totalItems: 0,
    totalPages: 0
  }
});

export const $responseStatusChanging = createStore<string | null>(null);
export const $responseStatusChangeLoading =
  changeInternshipDashboardCardResponseStatusQuery.$pending.map((pending) => pending);

$responseStatusChanging.on(
  changeInternshipDashboardCardResponseStatusQuery.start,
  (_, { responseId }) => responseId
);

$responseStatusChanging.on(
  changeInternshipDashboardCardResponseStatusQuery.finished.finally,
  () => null
);

$responses.on(getInternshipDashboardCardResponsesQuery.finished.success, (_, { result }) => result);
$responses.on(
  changeInternshipDashboardCardResponseStatusQuery.finished.success,
  (store, { result }) => ({
    ...store,
    data: store.data.filter((response) => response.id !== result.id)
  })
);

export const $responsesLoading = getInternshipDashboardCardResponsesQuery.$pending.map(
  (pending) => pending
);

sample({
  clock: authorizedRouteRole.opened,
  source: authorizedRouteRole.$params,
  fn: (params) => ({ id: params.id }),
  target: [getInternshipDashboardCardQuery.start, getInternshipDashboardCardResponsesQuery.start]
});

sample({
  clock: [pageChanged, filterChanged],
  source: {
    page: $page,
    params: authorizedRouteRole.$params,
    status: $status
  },
  fn: ({ page, params, status }) => ({ page, id: params.id, status }),
  target: getInternshipDashboardCardResponsesQuery.start
});

sample({
  clock: responseStatusChanged,
  source: {
    params: authorizedRouteRole.$params,
    status: $status
  },
  fn: ({ params }, payload) => ({
    id: params.id,
    responseId: payload.id.toString(),
    status: payload.status
  }),
  target: changeInternshipDashboardCardResponseStatusQuery.start
});

sample({
  clock: changeInternshipDashboardCardResponseStatusQuery.finished.success,
  target: showSuccess({
    title: 'Статус отклика успешно изменен',
    message: 'Статус отклика успешно изменен'
  })
});

sample({
  clock: changeInternshipDashboardCardResponseStatusQuery.finished.failure,
  target: showError('Ошибка при изменении статуса отклика')
});
