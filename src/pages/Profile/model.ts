import { routes } from '@/shared/routing/index'
import { chainAuthorized } from '@/shared/session'

export const currentRoute = routes.profile
export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.signIn.open,
})
