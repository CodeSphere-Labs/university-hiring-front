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
  profileInfo: createRoute<{ id: string }>(),
  invitations: createRoute(),
  invitationAccept: createRoute<{ token: string }>()
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
      path: '/profile/:id',
      route: routes.profileInfo
    },
    {
      path: '/invitations',
      route: routes.invitations
    },
    {
      path: '/invite/:token',
      route: routes.invitationAccept
    }
  ],
  controls
});

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory
});
