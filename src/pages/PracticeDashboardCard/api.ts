import { createQuery } from '@farfetched/core';

import { createCommonRequestFx } from '@/shared/api/requests';

export const getPracticeQuery = createQuery({
  effect: createCommonRequestFx<string, void>((id) => ({
    url: `/practices/${id}`,
    method: 'GET'
  }))
});
