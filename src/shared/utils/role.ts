import type { Role } from '@/shared/api/types';

const ROLE_OPTIONS = {
  ADMIN: [
    { label: 'Сотрудник университета', value: 'UNIVERSITY_STAFF' },
    { label: 'Сотрудник компании', value: 'STAFF' },
    { label: 'Студент', value: 'STUDENT' }
  ],
  UNIVERSITY_STAFF: [
    { label: 'Сотрудник университета', value: 'UNIVERSITY_STAFF' },
    { label: 'Студент', value: 'STUDENT' },
    { label: 'Сотрудник компании', value: 'STAFF' }
  ],
  STAFF: [{ label: 'Сотрудник компании', value: 'STAFF' }],
  STUDENT: [{ label: 'Студент', value: 'STUDENT' }]
};

export const getRoleOptions = (role: Role | undefined) => (role ? ROLE_OPTIONS[role] : []);

export const getRole = (role: string | undefined): { label: string; color: string } => {
  if (!role) return { label: 'Неизвестно', color: 'gray' };

  switch (role) {
    case 'ADMIN':
      return { label: 'Администратор', color: 'red' };
    case 'STAFF':
      return { label: 'Сотрудник компании', color: 'blue' };
    case 'STUDENT':
      return { label: 'Студент', color: 'green' };
    case 'UNIVERSITY_STAFF':
      return { label: 'Сотрудник университета', color: 'purple' };
    default:
      return { label: 'Неизвестно', color: 'gray' };
  }
};
