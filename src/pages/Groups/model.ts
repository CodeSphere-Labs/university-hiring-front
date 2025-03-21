import { routes } from '@/shared/routing/index'
import { chainAuthorized } from '@/shared/session/model'

export const currentRoute = routes.groups
export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.signIn.open,
})
