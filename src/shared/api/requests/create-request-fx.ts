import { createEffect } from 'effector'
import { type FetchOptions, ofetch } from 'ofetch'

import { ErrorResponse } from '@/shared/api/types'

type CreateRequestParams = FetchOptions & {
  url: string
  responseType?: 'json' | undefined
}

type Fn<P> = (params: P) => CreateRequestParams

type Payload<P> = CreateRequestParams | Fn<P>

type CreateRequestInstanceParams<P> = CreateRequestParams & {
  payload: Payload<P>
}

type CreateRequestFxParams = Omit<
  CreateRequestInstanceParams<CreateRequestParams>,
  'payload' | 'url'
>

function getConfig<P>(payload: Payload<P>, params: P): CreateRequestParams {
  return typeof payload === 'function' ? payload(params) : payload
}

const createRequestInstance = <P = CreateRequestParams, R = void, E = Error>({
  baseURL,
  headers,
  payload,
}: CreateRequestInstanceParams<P>) =>
  createEffect<P, R, E>((params) => {
    const { url, ...fetchOptions } = getConfig(payload, params)

    const newHeaders = new Headers(headers)

    return ofetch(url, {
      ...fetchOptions,
      headers: newHeaders,
      credentials: 'include',
      baseURL,
    })
  })

export const createRequestFx =
  (params: CreateRequestFxParams) =>
  <P = CreateRequestParams, R = void, E = ErrorResponse>(payload: Payload<P>) =>
    createRequestInstance<P, R, E>({
      ...(params as CreateRequestParams),
      payload,
    })
