import { createQuery } from '@farfetched/core';

import type { OpportunityResponse } from '@/shared/api/types';

import { createCommonRequestFx } from '@/shared/api/requests';
import { attachAuthHandler } from '@/shared/session/auth-barrier';

export const getInternshipDashboardCardQuery = createQuery({
  effect: createCommonRequestFx<string, OpportunityResponse>((id) => ({
    url: `/opportunities/${id}`,
    params: {
      withResponses: true
    }
  }))
});

attachAuthHandler(getInternshipDashboardCardQuery);
