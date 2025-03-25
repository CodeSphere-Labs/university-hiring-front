import { createQuery } from '@farfetched/core'

import { createCommonRequestFx } from '@/shared/api/requests'
import {
  InvintationResponse,
  Invitation,
  InvitationParams,
} from '@/shared/api/types'
import { attachAuthHandler } from '@/shared/session/auth-barrier'

export const getInvitationsQuery = createQuery({
  effect: createCommonRequestFx<InvitationParams, InvintationResponse>(
    (params) => ({
      url: '/invitations',
      query: params,
    }),
  ),
})

export const deleteInvitationQuery = createQuery({
  effect: createCommonRequestFx<number, Invitation>((id) => ({
    url: `/invitations/${id}`,
    method: 'DELETE',
  })),
})

export const refreshInvitationQuery = createQuery({
  effect: createCommonRequestFx<number, Invitation>((id) => ({
    url: `/invitations/refresh-invitation/${id}`,
    method: 'PATCH',
  })),
})

attachAuthHandler(getInvitationsQuery)
attachAuthHandler(deleteInvitationQuery)
attachAuthHandler(refreshInvitationQuery)
