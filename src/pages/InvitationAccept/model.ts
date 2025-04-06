import { routes } from '@/shared/routing';
import { chainAuthorized } from '@/shared/session/model';

export const currentRoute = routes.invitationAccept;
export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.signIn.open
});
