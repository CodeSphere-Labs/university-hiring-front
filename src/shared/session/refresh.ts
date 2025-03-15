import { createQuery } from '@farfetched/core'

import { createCommonRequestFx } from '@/shared/api/requests'
import { User } from '@/shared/api/types'

export const refreshQuery = createQuery({
  effect: createCommonRequestFx<void, User>({
    url: '/auth/refresh-token',
  }),
})
