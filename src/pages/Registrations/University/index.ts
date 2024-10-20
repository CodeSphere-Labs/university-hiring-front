import { lazy } from 'react'

import { currentRoute } from './model'

export const UniversityRegistrationPage = lazy(() => import('./University'))

export const UniversityRegistrationRoute = {
  view: UniversityRegistrationPage,
  route: currentRoute,
}
