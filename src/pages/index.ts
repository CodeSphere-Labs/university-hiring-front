import { createRoutesView } from 'atomic-router-react'

import { NotFoundPage } from '@/pages/NotFound/NotFound'
import { SignInRoute } from '@/pages/SingIn'

import { HomeRoute } from './Home'

export const Pages = createRoutesView({
  routes: [HomeRoute, SignInRoute],
  otherwise: NotFoundPage,
})
