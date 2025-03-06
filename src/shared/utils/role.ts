export const getRoleInRussian = (
  role: string | undefined,
): { label: string; color: string } => {
  if (!role) return { label: 'Неизвестно', color: 'gray' }

  switch (role) {
    case 'ADMIN':
      return { label: 'Администратор', color: 'red' }
    case 'STAFF':
      return { label: 'Сотрудник', color: 'blue' }
    case 'STUDENT':
      return { label: 'Студент', color: 'green' }
    default:
      return { label: 'Неизвестно', color: 'gray' }
  }
}
