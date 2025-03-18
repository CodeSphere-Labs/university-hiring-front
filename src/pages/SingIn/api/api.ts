import { createMutation } from '@farfetched/core'

import { createCommonRequestFx } from '@/shared/api/requests'
import { AuthDto } from '@/shared/api/types'

export const signInMutation = createMutation({
  effect: createCommonRequestFx<AuthDto, void>((body) => ({
    url: '/auth/sign-in',
    method: 'POST',
    body,
  })),
})
