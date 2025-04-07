import { createQuery } from '@farfetched/core';

import type { OpportunityParams, OpportunityResponse } from '@/shared/api/types';

import { createCommonRequestFx } from '@/shared/api/requests';

export const getOpportunitiesQuery = createQuery({
  effect: createCommonRequestFx<OpportunityParams, OpportunityResponse>((params) => ({
    url: '/opportunities',
    params: {
      ...params,
      createdByMe: true
    }
  }))
});

export const getOpportunitiesMoreQuery = createQuery({
  effect: createCommonRequestFx<OpportunityParams, OpportunityResponse>((params) => ({
    url: '/opportunities',
    params: {
      ...params,
      createdByMe: true
    }
  }))
});
