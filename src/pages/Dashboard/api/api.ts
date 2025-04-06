import { createQuery } from '@farfetched/core';

import type { InvitationsStats } from '@/shared/api/types';

import { createCommonRequestFx } from '@/shared/api/requests';
import { attachAuthHandler } from '@/shared/session/auth-barrier';

export const getInvitationsStatsQuery = createQuery({
  effect: createCommonRequestFx<string, InvitationsStats[]>((filter) => ({
    url: '/invitations/stats',
    query: { filter }
  }))
});

attachAuthHandler(getInvitationsStatsQuery);
