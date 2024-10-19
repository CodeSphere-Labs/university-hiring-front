import { createRoutesView } from 'atomic-router-react'

import { NotFoundPage } from '@/pages/NotFound/NotFound'

import { HomeRoute } from './Home'

export const Pages = createRoutesView({
  routes: [HomeRoute],
  otherwise: NotFoundPage,
})
