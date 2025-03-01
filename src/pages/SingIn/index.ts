import { createRouteView } from 'atomic-router-react'
import { lazy } from 'react'

import { LoadingPage } from '@/shared/ui/LoadingPage/LoadingPage'

import { anonymousRoute, currentRoute } from './model'

export const SignInPage = lazy(() => import('./ui/SignIn'))

const AuthorizedView = createRouteView({
  route: anonymousRoute,
  view: SignInPage,
  otherwise: LoadingPage,
})

export const SignInRoute = {
  view: AuthorizedView,
  route: currentRoute,
}
