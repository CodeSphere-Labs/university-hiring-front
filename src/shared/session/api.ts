import { createQuery } from '@farfetched/core'

import { createCommonRequestFx } from '@/shared/api/requests'
import {
  ErrorResponse,
  Group,
  InvitationCreate,
  Organization,
  Project,
  User,
} from '@/shared/api/types'

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

export const getOrganizationsQuery = createQuery({
  effect: createCommonRequestFx<void, Organization[]>({
    url: '/organizations',
  }),
})

export const getGroupsQuery = createQuery({
  effect: createCommonRequestFx<void, Group[]>({
    url: '/groups',
  }),
})

export const createOrganizationQuery = createQuery({
  effect: createCommonRequestFx<
    Omit<Organization, 'id' | 'logoUrl'>,
    Organization
  >((body) => ({
    url: '/organizations',
    method: 'POST',
    body,
  })),
})

export const createGroupQuery = createQuery({
  effect: createCommonRequestFx<Pick<Group, 'name'>, Group>((body) => ({
    url: '/groups',
    method: 'POST',
    body,
  })),
})

export const createInvitation = createQuery({
  effect: createCommonRequestFx<InvitationCreate, void>((body) => ({
    url: '/invitation/create-invitation',
    method: 'POST',
    body,
  })),
})

attachAuthHandler(updateUserQuery)
attachAuthHandler(addProjectQuery)
attachAuthHandler(deleteProjectQuery)
attachAuthHandler(createOrganizationQuery)
attachAuthHandler(getOrganizationsQuery)
attachAuthHandler(getAvailableGroupedSkillsQuery)
attachAuthHandler(logoutQuery)
attachAuthHandler(createGroupQuery)
attachAuthHandler(createInvitation)
