import { createRoutesView } from 'atomic-router-react'

import { NotFoundPage } from '@/pages/NotFound/NotFound'
import { SignInRoute } from '@/pages/SingIn'

import { HomeRoute } from './Home'
import { DashboardRoute } from '@/pages/Dashboard'
import { GroupsRoute } from '@/pages/Groups'
import { InternshipRoute } from '@/pages/Internship'

export const Pages = createRoutesView({
  routes: [
    HomeRoute,
    SignInRoute,
    DashboardRoute,
    GroupsRoute,
    InternshipRoute,
  ],
  otherwise: NotFoundPage,
})
