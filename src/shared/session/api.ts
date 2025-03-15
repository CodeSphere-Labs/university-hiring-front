import { createQuery } from '@farfetched/core'

import { createCommonRequestFx } from '@/shared/api/requests'
import { Organization, Project, User } from '@/shared/api/types'

import { attachAuthHandler } from './auth-barrier'

export const sessionQuery = createQuery({
  effect: createCommonRequestFx<void, User>({
    url: '/users/profile',
  }),
})

export const logoutQuery = createQuery({
  effect: createCommonRequestFx<number, void>((id) => ({
    url: '/auth/logout',
    query: {
      id,
    },
  })),
})

export const getAvailableGroupedSkillsQuery = createQuery({
  effect: createCommonRequestFx<void, string[]>({
    url: '/skills/grouped',
  }),
})

export const updateUserQuery = createQuery({
  effect: createCommonRequestFx<Partial<User>, User>((user) => ({
    url: '/users/profile',
    method: 'PATCH',
    body: user,
  })),
})

export const addProjectQuery = createQuery({
  effect: createCommonRequestFx<Omit<Project, 'id'>, User>((body) => ({
    url: '/students/projects',
    method: 'POST',
    body,
  })),
})

export const deleteProjectQuery = createQuery({
  effect: createCommonRequestFx<string, User>((id) => ({
    url: `/students/projects/${id}`,
    method: 'DELETE',
  })),
})

export const createOrganizationQuery = createQuery({
  effect: createCommonRequestFx<
    Omit<Organization, 'id' | 'logoUrl'>,
    Organization,
    Error & { statusCode: number }
  >((body) => ({
    url: '/organizations',
    method: 'POST',
    body,
  })),
})

export const getOrganizationsQuery = createQuery({
  effect: createCommonRequestFx<void, Organization[]>({
    url: '/organizations',
  }),
})

attachAuthHandler(updateUserQuery)
attachAuthHandler(addProjectQuery)
attachAuthHandler(deleteProjectQuery)
attachAuthHandler(createOrganizationQuery)
attachAuthHandler(getOrganizationsQuery)
attachAuthHandler(getAvailableGroupedSkillsQuery)
attachAuthHandler(logoutQuery)
