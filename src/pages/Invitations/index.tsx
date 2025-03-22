import { createRouteView } from 'atomic-router-react'
import { lazy, Suspense } from 'react'

import { LoadingPage } from '@/shared/ui/LoadingPage/LoadingPage'
import { Navbar } from '@/widgets/Navbar/Navbar'

import { authorizedRoute, currentRoute } from './model'

export const InvitationsPage = lazy(() => import('./Invitations'))

const AuthorizedView = createRouteView({
  route: authorizedRoute,
  view: InvitationsPage,
  otherwise: LoadingPage,
})

export const InvitationsRoute = {
  view: () => (
    <Suspense fallback={<LoadingPage />}>
      <AuthorizedView />
    </Suspense>
  ),
  route: currentRoute,
  layout: Navbar,
}
