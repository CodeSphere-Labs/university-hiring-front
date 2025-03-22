import { combine, createEvent, createStore, sample } from 'effector'

import {
  InvitationFilter,
  InvitationsStats,
  InvitationStatus,
} from '@/shared/api/types'
import { routes } from '@/shared/routing/index'
import { chainAuthorized } from '@/shared/session/model'

import { getInvitationsStatsQuery } from '../api/api'

export const currentRoute = routes.dashboard
export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.signIn.open,
})

export const redirectedToInvitations = createEvent<{
  status: InvitationStatus
  filter: InvitationFilter
}>()
export const statsFilterChanged = createEvent<InvitationFilter>()

export const $invitationsStatsFilter =
  createStore<InvitationFilter>('createdByMe')
$invitationsStatsFilter.on(statsFilterChanged, (_, filter) => filter)

export const $invitationsStatsByMe = createStore<InvitationsStats[]>([])
export const $invitationsStatsByAll = createStore<InvitationsStats[]>([])

export const $invitationsStats = combine(
  $invitationsStatsFilter,
  $invitationsStatsByMe,
  $invitationsStatsByAll,
  (filter, byMe, byAll) => (filter === 'createdByMe' ? byMe : byAll),
)

export const $invitationsStatsLoading = combine(
  getInvitationsStatsQuery.$pending,
  $invitationsStatsByMe,
  $invitationsStatsByAll,
  (pending, byMe, byAll) => {
    if (byMe.length > 0 || byAll.length > 0) {
      return false
    }
    return pending
  },
)

sample({
  clock: authorizedRoute.opened,
  source: $invitationsStatsFilter,
  fn: (filter) => filter,
  target: getInvitationsStatsQuery.start,
})

sample({
  clock: getInvitationsStatsQuery.finished.success,
  fn: ({ result }) => result,
  target: $invitationsStatsByMe,
})

sample({
  clock: getInvitationsStatsQuery.finished.success,
  fn: ({ result }) => result,
  target: $invitationsStatsByAll,
})

sample({
  clock: redirectedToInvitations,
  fn: ({ status, filter }) => ({ params: {}, query: { status, filter } }),
  target: routes.invitations.navigate,
})

sample({
  clock: statsFilterChanged,
  target: getInvitationsStatsQuery.start,
})

$invitationsStatsByMe.reset(authorizedRoute.closed)
$invitationsStatsByAll.reset(authorizedRoute.closed)
$invitationsStatsFilter.reset(authorizedRoute.closed)
