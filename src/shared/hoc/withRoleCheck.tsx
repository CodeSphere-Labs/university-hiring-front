import type { ReactNode } from 'react';

import { useUnit } from 'effector-react';

import type { Role } from '@/shared/api/types';

import { $user } from '@/shared/session/model';

interface WithRoleCheckProps {
  allowedRoles: Role[];
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * HOC для проверки ролей пользователя
 * @param allowedRoles - Массив разрешенных ролей
 * @param fallback - Компонент, который будет отображен, если у пользователя нет доступа
 * @param children - Дочерние компоненты, которые будут отображены, если у пользователя есть доступ
 */
export const WithRoleCheck = ({ allowedRoles, fallback = null, children }: WithRoleCheckProps) => {
  const user = useUnit($user);

  if (!user || !allowedRoles.includes(user.role as Role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

/**
 * HOC-функция для создания компонента с проверкой ролей
 * @param Component - Компонент, который нужно обернуть
 * @param allowedRoles - Массив разрешенных ролей
 * @param fallback - Компонент, который будет отображен, если у пользователя нет доступа
 */
// eslint-disable-next-line react-refresh/only-export-components
export function withRoleCheck<P extends object>(
  Component: React.ComponentType<P>,
  allowedRoles: Role[],
  fallback: ReactNode = null
) {
  const WithRoleCheckWrapper = (props: P) => (
    <WithRoleCheck fallback={fallback} allowedRoles={allowedRoles}>
      <Component {...props} />
    </WithRoleCheck>
  );

  WithRoleCheckWrapper.displayName = `withRoleCheck(${Component.displayName || Component.name || 'Component'})`;

  return WithRoleCheckWrapper;
}
