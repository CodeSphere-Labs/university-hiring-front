import { createRouteView } from 'atomic-router-react';
import { lazy, Suspense } from 'react';

import { LoadingPage } from '@/shared/ui/LoadingPage/LoadingPage';
import { Navbar } from '@/widgets';

import { authorizedRoute, currentRoute } from './model/model';

export const PracticeDashboardCardPage = lazy(() => import('./PracticeDashboardCard'));

const AuthorizedView = createRouteView({
  // at the moment of writing this, the type of authorizedRoute is not correct
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  route: authorizedRoute,
  view: PracticeDashboardCardPage,
  otherwise: LoadingPage
});

export const PracticeDashboardCardRoute = {
  view: () => (
    <Suspense fallback={<LoadingPage />}>
      <AuthorizedView />
    </Suspense>
  ),
  route: currentRoute,
  layout: Navbar
};
