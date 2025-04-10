import type { IconProps } from '@tabler/icons-react';
import type { RouteInstance } from 'atomic-router';

import {
  IconBriefcase,
  IconClipboardList,
  IconHome,
  IconLayoutDashboard,
  IconMail,
  IconUser,
  IconUsers
} from '@tabler/icons-react';
import { createStore } from 'effector';

import type { Role } from '@/shared/api/types';

import { routes } from '@/shared/routing';

interface Link {
  active: RouteInstance<any>;
  icon: React.FC<IconProps>;
  label: string;
  roles: Role[];
  route: RouteInstance<any>;
}

export const $links = createStore<Link[]>([
  {
    route: routes.home,
    label: 'Главная',
    icon: IconHome,
    active: routes.home,
    roles: ['ADMIN', 'UNIVERSITY_STAFF', 'STAFF', 'STUDENT']
  },
  {
    route: routes.dashboard,
    label: 'Панель управления',
    icon: IconLayoutDashboard,
    active: routes.dashboard,
    roles: ['ADMIN', 'UNIVERSITY_STAFF', 'STAFF', 'STUDENT']
  },
  {
    route: routes.invitations,
    label: 'Приглашения',
    icon: IconMail,
    active: routes.invitations,
    roles: ['ADMIN', 'UNIVERSITY_STAFF', 'STAFF']
  },
  {
    route: routes.groups,
    label: 'Группы',
    icon: IconUsers,
    active: routes.groups,
    roles: ['ADMIN', 'UNIVERSITY_STAFF']
  },
  {
    route: routes.internship,
    label: 'Стажировки',
    icon: IconBriefcase,
    active: routes.internship,
    roles: ['ADMIN', 'STUDENT']
  },
  {
    route: routes.internshipDashboard,
    label: 'Ваши вакансии',
    icon: IconClipboardList,
    active: routes.internshipDashboard,
    roles: ['ADMIN', 'STAFF']
  },
  {
    route: routes.profile,
    label: 'Профиль',
    icon: IconUser,
    active: routes.profile,
    roles: ['ADMIN', 'UNIVERSITY_STAFF', 'STAFF', 'STUDENT']
  }
]);
