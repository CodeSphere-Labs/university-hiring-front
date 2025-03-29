import { createHistoryRouter, createRoute, createRouterControls } from 'atomic-router';
import { sample } from 'effector';
import { createBrowserHistory } from 'history';

import { appStarted } from '@/shared/config/init';

export const routes = {
  home: createRoute(),
  signIn: createRoute(),
  dashboard: createRoute(),
  groups: createRoute(),
  group: createRoute<{ id: string }>(),
  internship: createRoute(),
  profile: createRoute(),
  invitations: createRoute()
};

export const controls = createRouterControls();

export const router = createHistoryRouter({
  routes: [
    {
      path: '/',
      route: routes.home
    },
    {
      path: '/sign-in',
      route: routes.signIn
    },
    {
      path: '/dashboard',
      route: routes.dashboard
    },
    {
      path: '/groups',
      route: routes.groups
    },
    {
      path: '/group/:id',
      route: routes.group
    },
    {
      path: '/internship',
      route: routes.internship
    },
    {
      path: '/profile',
      route: routes.profile
    },
    {
      path: '/invitations',
      route: routes.invitations
    }
  ],
  controls
});

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory
});
