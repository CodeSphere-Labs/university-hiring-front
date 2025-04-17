import { createEvent, createStore } from 'effector';

import type { CreatedByFilter } from '@/shared/api/types';

export const DEFAULT_FILTER = 'all';

export const filterChanged = createEvent<CreatedByFilter>();

export const $filter = createStore<CreatedByFilter>(DEFAULT_FILTER);
$filter.on(filterChanged, (_, filter) => filter);
