import { routes } from '@/shared/routing/index'
import { chainAuthorized, chainRole } from '@/shared/session/model'

export const currentRoute = routes.internship
export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.signIn.open,
})

export const authorizedRouteRole = chainRole(
  authorizedRoute,
  ['ADMIN', 'STAFF', 'STUDENT'],
  {
    otherwise: routes.home.open,
  },
)
