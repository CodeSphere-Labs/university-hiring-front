import { createEvent, createStore } from 'effector';

import type { PracticeFilter } from '@/shared/api/types';

export const DEFAULT_FILTER = 'all';

export const filterChanged = createEvent<PracticeFilter>();

export const $filter = createStore<PracticeFilter>(DEFAULT_FILTER);
$filter.on(filterChanged, (_, filter) => filter);
