import { createQuery } from '@farfetched/core';

import type { User } from '@/shared/api/types';

import { createCommonRequestFx } from '@/shared/api/requests';

export const refreshQuery = createQuery({
  effect: createCommonRequestFx<void, User>({
    url: '/auth/refresh-token'
  })
});
