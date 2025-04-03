import { createQuery } from '@farfetched/core';

import type { OpportunityParams, OpportunityResponse } from '@/shared/api/types';

import { createCommonRequestFx } from '@/shared/api/requests';
import { attachAuthHandler } from '@/shared/session/auth-barrier';

export const getOpportunitiesQuery = createQuery({
  effect: createCommonRequestFx<OpportunityParams, OpportunityResponse>((params) => ({
    url: '/opportunities',
    params
  }))
});

export const getOpportunitiesMoreQuery = createQuery({
  effect: createCommonRequestFx<OpportunityParams, OpportunityResponse>((params) => ({
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

attachAuthHandler(getOpportunitiesQuery);
attachAuthHandler(getOpportunitiesMoreQuery);
attachAuthHandler(respondToOpportunityQuery);
