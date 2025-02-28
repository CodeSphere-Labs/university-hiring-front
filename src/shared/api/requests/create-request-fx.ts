import { createEffect } from 'effector'
import { type FetchOptions, ofetch } from 'ofetch'

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

const createRequestInstance = <P = CreateRequestParams, R = void>({
  baseURL,
  headers,
  payload,
}: CreateRequestInstanceParams<P>) =>
  createEffect<P, R>((params) => {
    const { url, ...fetchOptions } = getConfig(payload, params)

    const newHeaders = new Headers(headers)

    return ofetch(url, {
      ...fetchOptions,
      headers: newHeaders,
      baseURL,
    })
  })

export const createRequestFx =
  (params: CreateRequestFxParams) =>
  <P = CreateRequestParams, R = void>(payload: Payload<P>) =>
    createRequestInstance<P, R>({
      ...(params as CreateRequestParams),
      payload,
    })
