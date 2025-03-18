import { Query } from '@farfetched/core'
import { createEffect, createEvent, sample } from 'effector'

import { refreshQuery } from '@/shared/session/refresh'

export const retryLastRequest = createEvent<{
  query: Query<any, any, any>
  params: any
}>()

const retryRequestFx = createEffect(
  ({ query, params }: { query: Query<any, any, any>; params: any }) =>
    query.start(params),
)

sample({
  clock: retryLastRequest,
  target: refreshQuery.start,
})

sample({
  clock: refreshQuery.finished.success,
  source: retryLastRequest,
  target: retryRequestFx,
})

export function attachAuthHandler(query: Query<any, any, any>) {
  sample({
    clock: query.finished.failure,
    filter: (failure) => failure.error.status === 403,
    fn: (failure) => ({
      query,
      params: failure.params,
    }),
    target: retryLastRequest,
  })
}
