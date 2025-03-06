import { createRouteView } from 'atomic-router-react'
import { lazy, Suspense } from 'react'

import { LoadingPage } from '@/shared/ui/LoadingPage/LoadingPage'
import { Navbar } from '@/widgets/Navbar/Navbar'

import { authorizedRoute, currentRoute } from './model'

export const DashboardPage = lazy(() => import('./Dashboard'))

const AuthorizedView = createRouteView({
  route: authorizedRoute,
  view: DashboardPage,
  otherwise: LoadingPage,
})

export const DashboardRoute = {
  view: () => (
    <Suspense fallback={<LoadingPage />}>
      <AuthorizedView />
    </Suspense>
  ),
  route: currentRoute,
  layout: Navbar,
}
