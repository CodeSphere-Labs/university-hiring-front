import { createQuery } from '@farfetched/core';

import type { GroupResponse, GroupsParams } from '@/shared/api/types';

import { createCommonRequestFx } from '@/shared/api/requests';

export const getInitialGroupQuery = createQuery({
  effect: createCommonRequestFx<GroupsParams, GroupResponse>((params) => ({
    url: `/groups/${params.id}`,
    params: {
      ...params,
      withStudents: true
    }
  }))
});

export const getGroupQuery = createQuery({
  effect: createCommonRequestFx<GroupsParams, GroupResponse>((params) => ({
    url: `/groups/${params.id}`,
    params: {
      ...params,
      withStudents: true
    }
  }))
});
