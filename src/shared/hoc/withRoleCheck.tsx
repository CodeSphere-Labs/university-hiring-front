import { useUnit } from 'effector-react'
import { ReactNode } from 'react'

import { Role } from '@/shared/api/types'
import { $user } from '@/shared/session/model'

interface WithRoleCheckProps {
  allowedRoles: Role[]
  fallback?: ReactNode
  children: ReactNode
}

/**
 * HOC для проверки ролей пользователя
 * @param allowedRoles - Массив разрешенных ролей
 * @param fallback - Компонент, который будет отображен, если у пользователя нет доступа
 * @param children - Дочерние компоненты, которые будут отображены, если у пользователя есть доступ
 */
export const WithRoleCheck = ({
  allowedRoles,
  fallback = null,
  children,
}: WithRoleCheckProps) => {
  const user = useUnit($user)

  if (!user || !allowedRoles.includes(user.role as Role)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

/**
 * HOC-функция для создания компонента с проверкой ролей
 * @param Component - Компонент, который нужно обернуть
 * @param allowedRoles - Массив разрешенных ролей
 * @param fallback - Компонент, который будет отображен, если у пользователя нет доступа
 */
export function withRoleCheck<P extends object>(
  Component: React.ComponentType<P>,
  allowedRoles: Role[],
  fallback: ReactNode = null,
) {
  return (props: P) => (
    <WithRoleCheck allowedRoles={allowedRoles} fallback={fallback}>
      <Component {...props} />
    </WithRoleCheck>
  )
}
