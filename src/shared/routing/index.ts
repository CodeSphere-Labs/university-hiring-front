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
  ],
  controls,
})

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
})
