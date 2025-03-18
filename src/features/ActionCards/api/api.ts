import { createQuery } from '@farfetched/core'

import { createCommonRequestFx } from '@/shared/api/requests'
import { Group, InvitationCreate, Organization } from '@/shared/api/types'
import { attachAuthHandler } from '@/shared/session/auth-barrier'

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

export const getGroupsQuery = createQuery({
  effect: createCommonRequestFx<void, Group[]>({
    url: '/groups',
  }),
})

export const getOrganizationsQuery = createQuery({
  effect: createCommonRequestFx<void, Organization[]>({
    url: '/organizations',
  }),
})

attachAuthHandler(createGroupQuery)
attachAuthHandler(createInvitation)
attachAuthHandler(createOrganizationQuery)
attachAuthHandler(getGroupsQuery)
attachAuthHandler(getOrganizationsQuery)
