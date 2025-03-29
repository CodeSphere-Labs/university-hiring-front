import { createQuery } from '@farfetched/core';

import type { Group, InvitationCreate, Organization, VacancyCreate } from '@/shared/api/types';

import { createCommonRequestFx } from '@/shared/api/requests';
import { attachAuthHandler } from '@/shared/session/auth-barrier';

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

export const getOrganizationsQuery = createQuery({
  effect: createCommonRequestFx<void, Organization[]>({
    url: '/organizations'
  })
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

attachAuthHandler(createGroupQuery);
attachAuthHandler(createInvitationQuery);
attachAuthHandler(createOrganizationQuery);
attachAuthHandler(getGroupsQuery);
attachAuthHandler(getOrganizationsQuery);
attachAuthHandler(refreshInvitationQuery);
attachAuthHandler(createVacancyQuery);
attachAuthHandler(createVacancyQuery);
