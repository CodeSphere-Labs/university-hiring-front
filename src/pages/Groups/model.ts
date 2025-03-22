import { routes } from '@/shared/routing/index'
import { chainAuthorized, chainRole } from '@/shared/session/model'

export const currentRoute = routes.groups
export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.signIn.open,
})

export const authorizedRouteRole = chainRole(
  authorizedRoute,
  ['ADMIN', 'UNIVERSITY_STAFF'],
  {
    otherwise: routes.home.open,
  },
)
