import { createMutation } from '@farfetched/core';

import type { AuthDto } from '@/shared/api/types';

import { createCommonRequestFx } from '@/shared/api/requests';

export const signInMutation = createMutation({
  effect: createCommonRequestFx<AuthDto, void>((body) => ({
    url: '/auth/sign-in',
    method: 'POST',
    body
  }))
});
