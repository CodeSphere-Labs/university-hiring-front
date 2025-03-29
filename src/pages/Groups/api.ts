import { createQuery } from '@farfetched/core';

import type { Group, GroupsParams } from '@/shared/api/types';

import { createCommonRequestFx } from '@/shared/api/requests';
import { attachAuthHandler } from '@/shared/session/auth-barrier';

export const getGroupsQuery = createQuery({
  effect: createCommonRequestFx<GroupsParams, Group[]>((params) => ({
    url: '/groups',
    query: params
  }))
});

attachAuthHandler(getGroupsQuery);
