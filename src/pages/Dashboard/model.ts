import { createStore, sample } from 'effector'

import { InvitationsStats } from '@/shared/api/types'
import { routes } from '@/shared/routing/index'
import { chainAuthorized } from '@/shared/session/model'

import { getInvitationsStatsQuery } from './api'

export const currentRoute = routes.dashboard
export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.signIn.open,
})

export const $invitationsStats = createStore<InvitationsStats[]>([])
export const $invitationsStatsLoading = getInvitationsStatsQuery.$pending.map(
  (pending) => pending,
)
$invitationsStats.on(
  getInvitationsStatsQuery.finished.success,
  (_, { result }) => result,
)

sample({
  clock: authorizedRoute.opened,
  target: getInvitationsStatsQuery.start,
})
