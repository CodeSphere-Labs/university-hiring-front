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
  onboarding: createRoute(),
  auth: {
    university: createRoute(),
    company: createRoute(),
    login: createRoute(),
  },
}

export const controls = createRouterControls()

export const router = createHistoryRouter({
  routes: [
    {
      path: '/auth/company',
      route: routes.auth.company,
    },
    {
      path: '/auth/university',
      route: routes.auth.university,
    },
    {
      path: '/auth',
      route: routes.auth.login,
    },
    {
      path: '/',
      route: routes.home,
    },
    {
      path: '/onboarding',
      route: routes.onboarding,
    },
  ],
  controls,
})

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
})
