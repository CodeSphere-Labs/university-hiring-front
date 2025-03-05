import { createRouteView } from 'atomic-router-react'
import { lazy } from 'react'

import { LoadingPage } from '@/shared/ui/LoadingPage/LoadingPage'

import { authorizedRoute, currentRoute } from './model'
import { Navbar } from '@/widgets/Navbar/Navbar'

export const InternshipPage = lazy(() => import('./Internship'))

const AuthorizedView = createRouteView({
  route: authorizedRoute,
  view: InternshipPage,
  otherwise: LoadingPage,
})

export const InternshipRoute = {
  view: AuthorizedView,
  route: currentRoute,
  layout: Navbar,
}
