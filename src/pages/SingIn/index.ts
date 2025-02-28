import { lazy } from 'react'

import { currentRoute } from './model'

export const SignInPage = lazy(() => import('./ui/SignIn'))

export const SignInRoute = {
  view: SignInPage,
  route: currentRoute,
}
