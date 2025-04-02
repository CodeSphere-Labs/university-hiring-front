import { createRouteView } from 'atomic-router-react';
import { lazy, Suspense } from 'react';

import { LoadingPage } from '@/shared/ui/LoadingPage/LoadingPage';
import { Navbar } from '@/widgets';

import { authorizedRoute, currentRoute } from './model.ts';

export const ProfileInfoPage = lazy(() => import('./ProfileInfo'));

const AuthorizedView = createRouteView({
  // at the moment of writing this, the type of authorizedRoute is not correct
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  route: authorizedRoute,
  view: ProfileInfoPage,
  otherwise: LoadingPage
});

export const ProfileInfoRoute = {
  view: () => (
    <Suspense fallback={<LoadingPage />}>
      <AuthorizedView />
    </Suspense>
  ),
  route: currentRoute,
  layout: Navbar
};
