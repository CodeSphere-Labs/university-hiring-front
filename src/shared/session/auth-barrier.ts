import type { Query } from '@farfetched/core';

import { createEffect, createEvent, createStore, sample } from 'effector';

import { refreshQuery } from '@/shared/session/refresh';

export const retryLastRequest = createEvent<{
  query: Query<any, any, any>;
  params: any;
}>();

const retryRequestFx = createEffect(
  ({ query, params }: { query: Query<any, any, any>; params: any }) => {
    return query.start(params);
  }
);

sample({
  clock: retryLastRequest,
  target: refreshQuery.start
});

sample({
  clock: refreshQuery.finished.success,
  source: retryLastRequest,
  target: retryRequestFx
});

export function attachAuthHandler(query: Query<any, any, any>) {
  const $retryCount = createStore(0);

  $retryCount.on(retryLastRequest, (state) => state + 1).reset(query.finished.success);

  sample({
    clock: query.finished.failure,
    source: $retryCount,
    filter: (count, failure) => failure.error.status === 403 && count < 1,
    fn: (_, failure) => ({
      query,
      params: failure.params
    }),
    target: retryLastRequest
  });
}
