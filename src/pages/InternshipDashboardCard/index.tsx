import { createRouteView } from 'atomic-router-react';
import { lazy, Suspense } from 'react';

import { LoadingPage } from '@/shared/ui/LoadingPage/LoadingPage';
import { Navbar } from '@/widgets';

import { authorizedRoute, currentRoute } from './model/model';

export const InternshipDashboardCardPage = lazy(() => import('./ui/InternshipDashboardCard'));

const AuthorizedView = createRouteView({
  // at the moment of writing this, the type of authorizedRoute is not correct
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  route: authorizedRoute,
  view: InternshipDashboardCardPage,
  otherwise: LoadingPage
});

export const InternshipDashboardCardRoute = {
  view: () => (
    <Suspense fallback={<LoadingPage />}>
      <AuthorizedView />
    </Suspense>
  ),
  route: currentRoute,
  layout: Navbar
};
