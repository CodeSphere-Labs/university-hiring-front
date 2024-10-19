import { createRoutesView } from 'atomic-router-react'

import { NotFoundPage } from '@/pages/NotFound/NotFound'

import { HomeRoute } from './Home'
import { OnboardingRoute } from './Onboarding'

export const Pages = createRoutesView({
  routes: [HomeRoute, OnboardingRoute],
  otherwise: NotFoundPage,
})
