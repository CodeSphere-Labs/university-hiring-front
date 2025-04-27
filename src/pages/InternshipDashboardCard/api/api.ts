import { createQuery } from '@farfetched/core';

import type {
  OpportunityResponse,
  OpportunityResponsesFilter,
  OpportunityResponsesParams,
  OpportunityResponsesResponse
} from '@/shared/api/types';

import { createCommonRequestFx } from '@/shared/api/requests';

export const getInternshipDashboardCardQuery = createQuery({
  effect: createCommonRequestFx<{ id: string }, OpportunityResponse>((params) => ({
    url: `/opportunities/${params.id}`,
    params: {
      withResponses: true
    }
  }))
});

export const getInternshipDashboardCardResponsesQuery = createQuery({
  effect: createCommonRequestFx<OpportunityResponsesParams, OpportunityResponsesResponse>(
    ({ id, ...params }) => ({
      url: `/opportunities/${id}/responses`,
      params
    })
  )
});

export const changeInternshipDashboardCardResponseStatusQuery = createQuery({
  effect: createCommonRequestFx<
    { id: string; responseId: string; status: OpportunityResponsesFilter },
    OpportunityResponse
  >(({ id, responseId, status }) => ({
    url: `/opportunities/${id}/responses/${responseId}/status`,
    method: 'PATCH',
    body: {
      status
    }
  }))
});
