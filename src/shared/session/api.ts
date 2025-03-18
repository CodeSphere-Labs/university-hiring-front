import { createQuery } from '@farfetched/core'

import { createCommonRequestFx } from '@/shared/api/requests'
import { User } from '@/shared/api/types'

import { attachAuthHandler } from './auth-barrier'

export const sessionQuery = createQuery({
  effect: createCommonRequestFx<void, User>({
    url: '/users/profile',
  }),
})

export const logoutQuery = createQuery({
  effect: createCommonRequestFx<number, void>((id) => ({
    url: '/auth/logout',
    query: {
      id,
    },
  })),
})

attachAuthHandler(logoutQuery)
