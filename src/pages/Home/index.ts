import { lazy } from 'react'

import { Navbar } from '@/widgets/Navbar/Navbar'

import { currentRoute } from './model'

export const HomePage = lazy(() => import('./Home'))

export const HomeRoute = {
  view: HomePage,
  route: currentRoute,
  layout: Navbar,
}
