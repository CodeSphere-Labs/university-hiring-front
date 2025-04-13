import { createQuery } from '@farfetched/core';

import type { User } from '@/shared/api/types';

import { createCommonRequestFx } from '@/shared/api/requests';

export const sessionQuery = createQuery({
  effect: createCommonRequestFx<void, User>({
    url: '/users/profile'
  })
});

export const logoutQuery = createQuery({
  effect: createCommonRequestFx<number, void>((id) => ({
    url: '/auth/logout',
    query: {
      id
    }
  }))
});
