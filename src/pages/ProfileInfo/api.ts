import { createQuery } from '@farfetched/core';

import type { User } from '@/shared/api/types';

import { createCommonRequestFx } from '@/shared/api/requests';

export const getProfileInfoQuery = createQuery({
  effect: createCommonRequestFx<string, User>((id) => ({
    url: `/users/${id}`
  }))
});
