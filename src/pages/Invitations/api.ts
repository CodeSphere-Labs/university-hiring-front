import { createQuery } from '@farfetched/core'

import { createCommonRequestFx } from '@/shared/api/requests'
import { InvintationResponse, InvitationParams } from '@/shared/api/types'
import { attachAuthHandler } from '@/shared/session/auth-barrier'

export const getInvitationsQuery = createQuery({
  effect: createCommonRequestFx<InvitationParams, InvintationResponse>(
    (params) => ({
      url: '/invitations',
      query: params,
    }),
  ),
})

attachAuthHandler(getInvitationsQuery)
