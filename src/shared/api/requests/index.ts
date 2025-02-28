import { createRequestFx } from './create-request-fx'

export const createCommonRequestFx = createRequestFx({
  baseURL: import.meta.env.VITE_API_URL,
  credentials: 'include',
})
