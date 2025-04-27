import { createQuery } from '@farfetched/core';

import type { OpportunitiesResponse, OpportunityParams } from '@/shared/api/types';

import { createCommonRequestFx } from '@/shared/api/requests';

export const getOpportunitiesQuery = createQuery({
  effect: createCommonRequestFx<OpportunityParams, OpportunitiesResponse>((params) => ({
    url: '/opportunities',
    params
  }))
});

export const getOpportunitiesMoreQuery = createQuery({
  effect: createCommonRequestFx<OpportunityParams, OpportunitiesResponse>((params) => ({
    url: '/opportunities',
    params
  }))
});

export const respondToOpportunityQuery = createQuery({
  effect: createCommonRequestFx<number, { opportunityId: number; userId: number }>((id) => ({
    url: `/opportunities/response/${id}`,
    method: 'PATCH'
  }))
});
