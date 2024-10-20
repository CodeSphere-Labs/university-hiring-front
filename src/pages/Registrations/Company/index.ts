import { lazy } from 'react'

import { currentRoute } from './model'

export const CompanyRegistrationPage = lazy(() => import('./Company'))

export const CompanyRegistrationRoute = {
  view: CompanyRegistrationPage,
  route: currentRoute,
}
