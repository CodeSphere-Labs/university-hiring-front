import { createRouteView } from 'atomic-router-react'
import { lazy } from 'react'

import { LoadingPage } from '@/shared/ui/LoadingPage/LoadingPage'

import { authorizedRoute, currentRoute } from './model'
import { Navbar } from '@/widgets/Navbar/Navbar'

export const GroupsPage = lazy(() => import('./Groups'))

const AuthorizedView = createRouteView({
  route: authorizedRoute,
  view: GroupsPage,
  otherwise: LoadingPage,
})

export const GroupsRoute = {
  view: AuthorizedView,
  route: currentRoute,
  layout: Navbar,
}
