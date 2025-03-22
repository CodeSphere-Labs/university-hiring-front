import {
  IconBriefcase,
  IconHome,
  IconLayoutDashboard,
  IconMail,
  IconProps,
  IconUser,
  IconUsers,
} from '@tabler/icons-react'
import { RouteInstance } from 'atomic-router'
import { createStore } from 'effector'

import { Role } from '@/shared/api/types'
import { routes } from '@/shared/routing'

interface Link {
  route: RouteInstance<any>
  label: string
  icon: React.FC<IconProps>
  active: RouteInstance<any>
  roles: Role[]
}

export const $links = createStore<Link[]>([
  {
    route: routes.home,
    label: 'Главная',
    icon: IconHome,
    active: routes.home,
    roles: ['ADMIN', 'UNIVERSITY_STAFF', 'STAFF', 'STUDENT'],
  },
  {
    route: routes.dashboard,
    label: 'Панель управления',
    icon: IconLayoutDashboard,
    active: routes.dashboard,
    roles: ['ADMIN', 'UNIVERSITY_STAFF', 'STAFF', 'STUDENT'],
  },
  {
    route: routes.invitations,
    label: 'Приглашения',
    icon: IconMail,
    active: routes.invitations,
    roles: ['ADMIN', 'UNIVERSITY_STAFF', 'STAFF'],
  },
  {
    route: routes.groups,
    label: 'Группы',
    icon: IconUsers,
    active: routes.groups,
    roles: ['ADMIN', 'UNIVERSITY_STAFF'],
  },
  {
    route: routes.internship,
    label: 'Стажировки',
    icon: IconBriefcase,
    active: routes.internship,
    roles: ['ADMIN', 'STAFF', 'STUDENT'],
  },
  {
    route: routes.profile,
    label: 'Профиль',
    icon: IconUser,
    active: routes.profile,
    roles: ['ADMIN', 'UNIVERSITY_STAFF', 'STAFF', 'STUDENT'],
  },
])
