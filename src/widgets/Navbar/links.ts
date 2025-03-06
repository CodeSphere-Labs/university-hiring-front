import { createStore } from 'effector'
import { AiOutlineHome } from 'react-icons/ai'
import { CgProfile, CgWorkAlt } from 'react-icons/cg'
import { GoPeople } from 'react-icons/go'
import { RxDashboard } from 'react-icons/rx'

import { routes } from '@/shared/routing'

export const $links = createStore([
  {
    route: routes.home,
    label: 'Главная',
    icon: AiOutlineHome,
    active: routes.home,
  },
  {
    route: routes.dashboard,
    label: 'Панель управления',
    icon: RxDashboard,
    active: routes.dashboard,
  },
  {
    route: routes.groups,
    label: 'Группы',
    icon: GoPeople,
    active: routes.groups,
  },
  {
    route: routes.internship,
    label: 'Стажировки',
    icon: CgWorkAlt,
    active: routes.internship,
  },
  {
    route: routes.profile,
    label: 'Профиль',
    icon: CgProfile,
    active: routes.profile,
  },
])
