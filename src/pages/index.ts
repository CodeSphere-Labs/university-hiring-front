import { createRoutesView } from 'atomic-router-react'

import { DashboardRoute } from '@/pages/Dashboard'
import { GroupsRoute } from '@/pages/Groups'
import { InternshipRoute } from '@/pages/Internship'
import { NotFoundPage } from '@/pages/NotFound/NotFound'
import { ProfileRoute } from '@/pages/Profile'
import { SignInRoute } from '@/pages/SingIn'

import { HomeRoute } from './Home'

export const Pages = createRoutesView({
  routes: [
    HomeRoute,
    SignInRoute,
    DashboardRoute,
    GroupsRoute,
    InternshipRoute,
    ProfileRoute,
  ],
  otherwise: NotFoundPage,
})
