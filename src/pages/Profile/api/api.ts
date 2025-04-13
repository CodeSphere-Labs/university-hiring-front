import { createQuery } from '@farfetched/core';

import type { GroupedSkill, Project, User } from '@/shared/api/types';

import { createCommonRequestFx } from '@/shared/api/requests';

export const addProjectQuery = createQuery({
  effect: createCommonRequestFx<Omit<Project, 'id'>, User>((body) => ({
    url: '/students/projects',
    method: 'POST',
    body
  }))
});

export const deleteProjectQuery = createQuery({
  effect: createCommonRequestFx<string, User>((id) => ({
    url: `/students/projects/${id}`,
    method: 'DELETE'
  }))
});

export const getAvailableGroupedSkillsQuery = createQuery({
  effect: createCommonRequestFx<void, GroupedSkill[]>({
    url: '/skills/grouped'
  })
});

export const updateUserQuery = createQuery({
  effect: createCommonRequestFx<Partial<User>, User>((user) => ({
    url: '/users/profile',
    method: 'PATCH',
    body: user
  }))
});
