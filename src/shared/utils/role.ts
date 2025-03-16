export const getRole = (
  role: string | undefined,
): { label: string; color: string } => {
  if (!role) return { label: 'Неизвестно', color: 'gray' }

  switch (role) {
    case 'ADMIN':
      return { label: 'Администратор', color: 'red' }
    case 'STAFF':
      return { label: 'Сотрудник компании', color: 'blue' }
    case 'STUDENT':
      return { label: 'Студент', color: 'green' }
    case 'UNIVERSITY_STAFF':
      return { label: 'Сотрудник университета', color: 'purple' }
    default:
      return { label: 'Неизвестно', color: 'gray' }
  }
}
