import { createRouteView } from 'atomic-router-react'
import { lazy, Suspense } from 'react'

import { LoadingPage } from '@/shared/ui/LoadingPage/LoadingPage'
import { Navbar } from '@/widgets/Navbar/Navbar'

import { authorizedRoute, currentRoute } from './model/model'

export const ProfilePage = lazy(() => import('./ui/Profile'))

const AuthorizedView = createRouteView({
  route: authorizedRoute,
  view: ProfilePage,
  otherwise: LoadingPage,
})

export const ProfileRoute = {
  view: () => (
    <Suspense fallback={<LoadingPage />}>
      <AuthorizedView />
    </Suspense>
  ),
  route: currentRoute,
  layout: Navbar,
}
