import { lazy } from 'react'

import { currentRoute } from './model'

export const OnboardingPage = lazy(() => import('./Onboarding'))

export const OnboardingRoute = {
  view: OnboardingPage,
  route: currentRoute,
}
