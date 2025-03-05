import { createRouteView } from 'atomic-router-react'
import { lazy } from 'react'

import { LoadingPage } from '@/shared/ui/LoadingPage/LoadingPage'

import { authorizedRoute, currentRoute } from './model'
import { Navbar } from '@/widgets/Navbar/Navbar'

export const DashboardPage = lazy(() => import('./Dashboard'))

const AuthorizedView = createRouteView({
  route: authorizedRoute,
  view: DashboardPage,
  otherwise: LoadingPage,
})

export const DashboardRoute = {
  view: AuthorizedView,
  route: currentRoute,
  layout: Navbar,
}
