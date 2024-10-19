import { lazy } from 'react'

import { currentRoute } from './model'

export const HomePage = lazy(() => import('./Home'))

export const HomeRoute = {
  view: HomePage,
  route: currentRoute,
}
