import { routes } from '@/shared/routing/index';
import { chainAuthorized } from '@/shared/session/model';

export const currentRoute = routes.home;
export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.signIn.open
});
