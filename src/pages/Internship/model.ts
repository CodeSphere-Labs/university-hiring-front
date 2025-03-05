import { routes } from '@/shared/routing/index'
import { chainAuthorized } from '@/shared/session'

export const currentRoute = routes.internship
export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.signIn.open,
})
