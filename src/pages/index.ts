import { createRoutesView } from 'atomic-router-react';

import { DashboardRoute } from './Dashboard';
import { GroupRoute } from './Group';
import { GroupsRoute } from './Groups';
import { HomeRoute } from './Home';
import { InternshipRoute } from './Internship';
import { InternshipDashboardRoute } from './InternshipDashboard';
import { InternshipDashboardCardRoute } from './InternshipDashboardCard';
import { InvitationAcceptRoute } from './InvitationAccept';
import { InvitationsRoute } from './Invitations';
import { NotFoundPage } from './NotFound/NotFound';
import { PracticesDashboardRoute } from './PracticesDashboard';
import { ProfileRoute } from './Profile';
import { ProfileInfoRoute } from './ProfileInfo';
import { SignInRoute } from './SingIn';

export const Pages = createRoutesView({
  routes: [
    HomeRoute,
    SignInRoute,
    DashboardRoute,
    GroupsRoute,
    InternshipRoute,
    ProfileRoute,
    InvitationsRoute,
    GroupRoute,
    ProfileInfoRoute,
    InvitationAcceptRoute,
    InternshipDashboardRoute,
    InternshipDashboardCardRoute,
    PracticesDashboardRoute
  ],
  otherwise: NotFoundPage
});
