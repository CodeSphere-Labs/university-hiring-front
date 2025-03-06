import {
  IconBriefcase,
  IconHome,
  IconLayoutDashboard,
  IconUser,
  IconUsers,
} from '@tabler/icons-react'
import { createStore } from 'effector'

import { routes } from '@/shared/routing'

export const $links = createStore([
  {
    route: routes.home,
    label: 'Главная',
    icon: IconHome,
    active: routes.home,
  },
  {
    route: routes.dashboard,
    label: 'Панель управления',
    icon: IconLayoutDashboard,
    active: routes.dashboard,
  },
  {
    route: routes.groups,
    label: 'Группы',
    icon: IconUsers,
    active: routes.groups,
  },
  {
    route: routes.internship,
    label: 'Стажировки',
    icon: IconBriefcase,
    active: routes.internship,
  },
  {
    route: routes.profile,
    label: 'Профиль',
    icon: IconUser,
    active: routes.profile,
  },
])
