import { createRouteView } from 'atomic-router-react'
import { lazy } from 'react'

import { LoadingPage } from '@/shared/ui/LoadingPage/LoadingPage'

import { authorizedRoute, currentRoute } from './model'
import { Navbar } from '@/widgets/Navbar/Navbar'

export const ProfilePage = lazy(() => import('./Profile'))

const AuthorizedView = createRouteView({
  route: authorizedRoute,
  view: ProfilePage,
  otherwise: LoadingPage,
})

export const ProfileRoute = {
  view: AuthorizedView,
  route: currentRoute,
  layout: Navbar,
}
