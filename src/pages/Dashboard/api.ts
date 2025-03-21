import { createQuery } from '@farfetched/core'

import { createCommonRequestFx } from '@/shared/api/requests'
import { InvitationsStats } from '@/shared/api/types'

export const getInvitationsStatsQuery = createQuery({
  effect: createCommonRequestFx<void, InvitationsStats[]>({
    url: '/invitations/stats',
  }),
})
