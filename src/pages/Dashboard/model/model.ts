import { combine, createEvent, createStore, sample } from 'effector';

import type { InvitationFilter, InvitationsStats, InvitationStatus } from '@/shared/api/types';

import { createInvitationQuery } from '@/features/ActionCards/api/api';
import { routes } from '@/shared/routing/index';
import { chainAuthorized, chainRole } from '@/shared/session/model';

import { getInvitationsStatsQuery } from '../api/api';

export const currentRoute = routes.dashboard;
export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.signIn.open
});

export const authorizedRouteRole = chainRole(
  authorizedRoute,
  ['ADMIN', 'STAFF', 'UNIVERSITY_STAFF'],
  {
    otherwise: routes.home.open
  }
);

export const redirectedToInvitations = createEvent<{
  status: InvitationStatus;
  filter: InvitationFilter;
}>();
export const statsFilterChanged = createEvent<InvitationFilter>();

export const $invitationsStatsFilter = createStore<InvitationFilter>('createdByMe');
$invitationsStatsFilter.on(statsFilterChanged, (_, filter) => filter);

export const $invitationsStatsByMe = createStore<InvitationsStats[]>([]);
$invitationsStatsByMe.on(createInvitationQuery.finished.success, (store) =>
  store.map(updateStatsForWaitingOrAll)
);

export const $invitationsStatsByAll = createStore<InvitationsStats[]>([]);
$invitationsStatsByAll.on(createInvitationQuery.finished.success, (store) =>
  store.map(updateStatsForWaitingOrAll)
);

export const $invitationsStats = combine(
  $invitationsStatsFilter,
  $invitationsStatsByMe,
  $invitationsStatsByAll,
  (filter, byMe, byAll) => (filter === 'createdByMe' ? byMe : byAll)
);

export const $invitationsStatsLoading = combine(
  getInvitationsStatsQuery.$pending,
  $invitationsStatsByMe,
  $invitationsStatsByAll,
  (pending, byMe, byAll) => {
    if (byMe.length > 0 || byAll.length > 0) {
      return false;
    }
    return pending;
  }
);

sample({
  clock: authorizedRouteRole.opened,
  source: $invitationsStatsFilter,
  fn: (filter) => filter,
  target: getInvitationsStatsQuery.start
});

sample({
  clock: getInvitationsStatsQuery.finished.success,
  fn: ({ result }) => result,
  target: $invitationsStatsByMe
});

sample({
  clock: getInvitationsStatsQuery.finished.success,
  fn: ({ result }) => result,
  target: $invitationsStatsByAll
});

sample({
  clock: redirectedToInvitations,
  fn: ({ status, filter }) => ({ params: {}, query: { status, filter } }),
  target: routes.invitations.open
});

sample({
  clock: statsFilterChanged,
  target: getInvitationsStatsQuery.start
});

$invitationsStatsByMe.reset(authorizedRoute.closed);
$invitationsStatsByAll.reset(authorizedRoute.closed);
$invitationsStatsFilter.reset(authorizedRoute.closed);

function updateStatsForWaitingOrAll(item: InvitationsStats): InvitationsStats {
  const isWaitingOrAll = item.status === 'wait' || item.status === 'all';
  return isWaitingOrAll ? { ...item, stats: item.stats + 1 } : item;
}
