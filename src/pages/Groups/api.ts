import { createQuery } from '@farfetched/core';

import type { Group } from '@/shared/api/types';

import { createCommonRequestFx } from '@/shared/api/requests';

export const getGroupsQuery = createQuery({
  effect: createCommonRequestFx<void, Group[]>({
    url: '/groups',
    query: {
      withStudents: true
    }
  })
});
