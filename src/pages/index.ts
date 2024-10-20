import { createRoutesView } from 'atomic-router-react'

import { NotFoundPage } from '@/pages/NotFound/NotFound'

import { HomeRoute } from './Home'
import { OnboardingRoute } from './Onboarding'
import {
  CompanyRegistrationRoute,
  UniversityRegistrationRoute,
} from './Registrations'

export const Pages = createRoutesView({
  routes: [
    HomeRoute,
    OnboardingRoute,
    UniversityRegistrationRoute,
    CompanyRegistrationRoute,
  ],
  otherwise: NotFoundPage,
})
