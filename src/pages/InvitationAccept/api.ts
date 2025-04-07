import { createQuery } from '@farfetched/core';

import type { ErrorResponse, InvitationAcceptParams, User } from '@/shared/api/types';
import type { InvitationErrorKey } from '@/shared/config/errorCodes';

import { createCommonRequestFx } from '@/shared/api/requests';

export const checkInvitationQuery = createQuery({
  effect: createCommonRequestFx<string, void, ErrorResponse<InvitationErrorKey>>((token) => ({
    url: '/invitations/check-invitation',
    query: { token }
  }))
});

export const acceptInvitationQuery = createQuery({
  effect: createCommonRequestFx<InvitationAcceptParams, User>(({ body, token }) => ({
    url: '/invitations/confirm-invitation',
    method: 'POST',
    query: { token },
    body
  }))
});
