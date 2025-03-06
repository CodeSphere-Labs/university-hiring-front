import { withRoleCheck } from '@/shared/hoc'

import { AdminActions } from './ActionCards'

/**
 * Пример использования HOC withRoleCheck
 * Компонент ActionCards, доступный только для администраторов
 */
export const AdminOnlyActionCards = withRoleCheck(
  AdminActions,
  ['ADMIN'],
  <div>У вас нет доступа к этому разделу</div>,
)
