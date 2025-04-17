import { createEvent, createStore } from 'effector';
import { debounce } from 'patronum';

const DEBOUNCE_TIMEOUT = 400;

export const searchChanged = createEvent<string>();

export const $search = createStore<string>('');
$search.on(searchChanged, (_, search) => search);

export const debouncedSearchChanged = debounce({
  source: searchChanged,
  timeout: DEBOUNCE_TIMEOUT
});
