import { createQuery } from '@farfetched/core';

import type { Group } from '@/shared/api/types';

import { createCommonRequestFx } from '@/shared/api/requests';
import { attachAuthHandler } from '@/shared/session/auth-barrier';

export const getGroupQuery = createQuery({
  effect: createCommonRequestFx<string, Group>((id) => ({
    url: `/groups/${id}`,
    params: {
      withStudents: true
    }
  }))
});

attachAuthHandler(getGroupQuery);
