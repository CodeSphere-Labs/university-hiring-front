import { createRouteView } from 'atomic-router-react';
import { lazy, Suspense } from 'react';

import { LoadingPage } from '@/shared/ui/LoadingPage/LoadingPage';
import { Navbar } from '@/widgets';

import { authorizedRoute, currentRoute } from './model/model';

export const PracticesDashboardPage = lazy(() => import('./PracticesDashboard'));

const AuthorizedView = createRouteView({
  route: authorizedRoute,
  view: PracticesDashboardPage,
  otherwise: LoadingPage
});

export const PracticesDashboardRoute = {
  view: () => (
    <Suspense fallback={<LoadingPage />}>
      <AuthorizedView />
    </Suspense>
  ),
  route: currentRoute,
  layout: Navbar
};
