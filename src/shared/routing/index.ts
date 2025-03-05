import {
  createHistoryRouter,
  createRoute,
  createRouterControls,
} from 'atomic-router'
import { sample } from 'effector'
import { createBrowserHistory } from 'history'

import { appStarted } from '@/shared/config/init'

export const routes = {
  home: createRoute(),
  signIn: createRoute(),
  dashboard: createRoute(),
  groups: createRoute(),
  internship: createRoute(),
  profile: createRoute(),
}

export const controls = createRouterControls()

export const router = createHistoryRouter({
  routes: [
    {
      path: '/',
      route: routes.home,
    },
    {
      path: '/sign-in',
      route: routes.signIn,
    },
    {
      path: '/dashboard',
      route: routes.dashboard,
    },
    {
      path: '/groups',
      route: routes.groups,
    },
    {
      path: '/internship',
      route: routes.internship,
    },
    {
      path: '/profile',
      route: routes.profile,
    },
  ],
  controls,
})

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
})
