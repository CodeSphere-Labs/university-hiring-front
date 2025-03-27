import { createQuery } from '@farfetched/core';

import type { Group, GroupParams } from '@/shared/api/types';

import { createCommonRequestFx } from '@/shared/api/requests';

export const getGroupsQuery = createQuery({
  effect: createCommonRequestFx<GroupParams, Group[]>((params) => ({
    url: '/groups',
    query: params
  }))
});
