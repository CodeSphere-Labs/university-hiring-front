import { createRouteView } from 'atomic-router-react';
import { lazy, Suspense } from 'react';

import { LoadingPage } from '@/shared/ui/LoadingPage/LoadingPage';

import { anonymousRouteRoute, currentRoute } from './model/model';

export const InvitationAcceptPage = lazy(() => import('./ui/InvitationAccept'));

const AuthorizedView = createRouteView({
  // at the moment of writing this, the type of authorizedRoute is not correct
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  route: anonymousRouteRoute,
  view: InvitationAcceptPage,
  otherwise: LoadingPage
});

export const InvitationAcceptRoute = {
  view: () => (
    <Suspense fallback={<LoadingPage />}>
      <AuthorizedView />
    </Suspense>
  ),
  route: currentRoute
};
