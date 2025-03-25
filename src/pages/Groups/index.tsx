import { createRouteView } from 'atomic-router-react'
import { lazy, Suspense } from 'react'

import { LoadingPage } from '@/shared/ui/LoadingPage/LoadingPage'
import { Navbar } from '@/widgets'

import { authorizedRoute, currentRoute } from './model'

export const GroupsPage = lazy(() => import('./Groups'))

const AuthorizedView = createRouteView({
  route: authorizedRoute,
  view: GroupsPage,
  otherwise: LoadingPage,
})

export const GroupsRoute = {
  view: () => (
    <Suspense fallback={<LoadingPage />}>
      <AuthorizedView />
    </Suspense>
  ),
  route: currentRoute,
  layout: Navbar,
}
