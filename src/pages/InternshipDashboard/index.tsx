import { createRouteView } from 'atomic-router-react';
import { lazy, Suspense } from 'react';

import { LoadingPage } from '@/shared/ui/LoadingPage/LoadingPage';
import { Navbar } from '@/widgets';

import { authorizedRoute, currentRoute } from './model';

export const InternshipDashboardPage = lazy(() => import('./InternshipDashboard'));

const AuthorizedView = createRouteView({
  route: authorizedRoute,
  view: InternshipDashboardPage,
  otherwise: LoadingPage
});

export const InternshipDashboardRoute = {
  view: () => (
    <Suspense fallback={<LoadingPage />}>
      <AuthorizedView />
    </Suspense>
  ),
  route: currentRoute,
  layout: Navbar
};
