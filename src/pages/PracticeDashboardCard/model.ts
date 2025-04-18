import { routes } from '@/shared/routing';
import { chainAuthorized } from '@/shared/session/model';

export const currentRoute = routes.practice;

export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.signIn.open
});
