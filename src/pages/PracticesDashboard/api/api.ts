import { createQuery } from '@farfetched/core';

import type { PracticesParams, PracticesResponse } from '@/shared/api/types';

import { createCommonRequestFx } from '@/shared/api/requests';

export const getPracticesDashboardQuery = createQuery({
  effect: createCommonRequestFx<PracticesParams, PracticesResponse>((query) => ({
    url: `/practices`,
    query
  }))
});
