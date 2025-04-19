import { createQuery } from '@farfetched/core';

import type {
  Group,
  InvitationCreate,
  Organization,
  OrganizationParams,
  PracticeCreate,
  Student,
  User,
  VacancyCreate
} from '@/shared/api/types';

import { createCommonRequestFx } from '@/shared/api/requests';

export const createGroupQuery = createQuery({
  effect: createCommonRequestFx<Pick<Group, 'name'>, Group>((body) => ({
    url: '/groups',
    method: 'POST',
    body
  }))
});

export const createInvitationQuery = createQuery({
  effect: createCommonRequestFx<InvitationCreate, void>((body) => ({
    url: '/invitations/create-invitation',
    method: 'POST',
    body
  }))
});

export const createOrganizationQuery = createQuery({
  effect: createCommonRequestFx<Omit<Organization, 'id' | 'logoUrl'>, Organization>((body) => ({
    url: '/organizations',
    method: 'POST',
    body
  }))
});

export const getGroupsQuery = createQuery({
  effect: createCommonRequestFx<void, Group[]>({
    url: '/groups'
  })
});

export const getGroupStudentsQuery = createQuery({
  effect: createCommonRequestFx<string, Student[]>((id) => ({
    url: `/groups/${id}/students`
  }))
});

export const getOrganizationsQuery = createQuery({
  effect: createCommonRequestFx<OrganizationParams, Organization[]>((params) => ({
    url: '/organizations',
    params
  }))
});

export const refreshInvitationQuery = createQuery({
  effect: createCommonRequestFx<InvitationCreate, void>((body) => ({
    url: '/invitations/refresh-invitation',
    method: 'PATCH',
    body
  }))
});

export const createVacancyQuery = createQuery({
  effect: createCommonRequestFx<VacancyCreate, void>((body) => ({
    url: '/opportunities',
    method: 'POST',
    body
  }))
});

export const createPracticeQuery = createQuery({
  effect: createCommonRequestFx<PracticeCreate, void>((body) => ({
    url: '/practices',
    method: 'POST',
    body
  }))
});

export const getOrganizationUsersQuery = createQuery({
  effect: createCommonRequestFx<string, User[]>((id) => ({
    url: `/users/organization/${id}`
  }))
});
