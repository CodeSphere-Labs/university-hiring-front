import { createQuery } from '@farfetched/core';

import type { OpportunityParams, OpportunitiesResponse } from '@/shared/api/types';

import { createCommonRequestFx } from '@/shared/api/requests';

export const getOpportunitiesQuery = createQuery({
  effect: createCommonRequestFx<OpportunityParams, OpportunitiesResponse>((params) => ({
    url: '/opportunities',
    params: {
      ...params,
      createdByMe: true
    }
  }))
});

export const getOpportunitiesMoreQuery = createQuery({
  effect: createCommonRequestFx<OpportunityParams, OpportunitiesResponse>((params) => ({
    url: '/opportunities',
    params: {
      ...params,
      createdByMe: true
    }
  }))
});
