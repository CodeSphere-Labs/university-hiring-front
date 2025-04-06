import { createRouteView } from 'atomic-router-react';
import { lazy, Suspense } from 'react';

import { LoadingPage } from '@/shared/ui/LoadingPage/LoadingPage';
import { Navbar } from '@/widgets';

import { authorizedRoute, currentRoute } from './model';

export const InternshipPage = lazy(() => import('./Internship'));

const AuthorizedView = createRouteView({
  route: authorizedRoute,
  view: InternshipPage,
  otherwise: LoadingPage
});

export const InternshipRoute = {
  view: () => (
    <Suspense fallback={<LoadingPage />}>
      <AuthorizedView />
    </Suspense>
  ),
  route: currentRoute,
  layout: Navbar
};
