import { createEvent, createStore } from 'effector';

import type { CreatedByFilter, InvitationStatus } from '@/shared/api/types';

export const DEFAULT_FILTER = 'createdByMe';
export const DEFAULT_STATUS = 'all';

export const filterChanged = createEvent<CreatedByFilter>();
export const statusChanged = createEvent<InvitationStatus>();

export const $filter = createStore<CreatedByFilter>(DEFAULT_FILTER);
$filter.on(filterChanged, (_, filter) => filter);

export const $status = createStore<InvitationStatus>(DEFAULT_STATUS);
$status.on(statusChanged, (_, status) => status);
