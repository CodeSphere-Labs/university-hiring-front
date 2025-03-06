import { createRouteView } from 'atomic-router-react'
import { lazy, Suspense } from 'react'

import { LoadingPage } from '@/shared/ui/LoadingPage/LoadingPage'
import { Navbar } from '@/widgets/Navbar/Navbar'

import { authorizedRoute, currentRoute } from './model'

export const HomePage = lazy(() => import('./Home'))

const AuthorizedView = createRouteView({
  route: authorizedRoute,
  view: HomePage,
  otherwise: LoadingPage,
})

export const HomeRoute = {
  view: () => (
    <Suspense fallback={<LoadingPage />}>
      <AuthorizedView />
    </Suspense>
  ),
  route: currentRoute,
  layout: Navbar,
}
