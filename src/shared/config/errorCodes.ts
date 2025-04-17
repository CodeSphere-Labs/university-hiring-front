export const ErrorMessages = {
  default: 'Неизвестная ошибка',

  // General HTTP errors
  bad_request: 'Некорректный запрос',
  not_found: 'Ресурс не найден',
  already_exist: 'Уже существует',
  forbidden: 'Доступ запрещен',

  // Authentication & Authorization
  invalid_credentials: 'Неверный email или пароль',
  token_expired: 'Срок действия сессии истек',
  invalid_token: 'Недействительный токен',
  account_disabled: 'Аккаунт отключен',
  invalid_role: 'Недопустимая роль пользователя',

  // User related
  user_not_found: 'Пользователь не найден',
  user_already_exists: 'Пользователь с таким email уже существует',
  user_not_student: 'Пользователь не является студентом',
  user_not_staff: 'Пользователь не является сотрудником организации',
  user_not_university_staff: 'Пользователь не является сотрудником университета',
  student_profile_not_found: 'Профиль студента не найден',

  // Invitation related
  user_already_invited: 'Пользователь уже приглашен',
  invalid_invitation: 'Приглашение не найдено',
  invintation_used: 'Приглашение уже использовано',
  invintation_expired: 'Срок действия приглашения истек',
  invitation_not_found: 'Приглашение не найдено',

  // Organization related
  organization_not_found: 'Организация не найдена',
  your_organization_not_found: 'Ваша организация не найдена',
  organization_already_exists: 'Организация с таким названием уже существует',
  organization_disabled: 'Организация отключена',

  // Group related
  group_is_required: 'Необходимо указать группу',
  group_not_found: 'Группа не найдена',
  group_already_exists: 'Группа с таким названием уже существует',
  student_already_in_group: 'Студент уже состоит в группе',
  student_not_in_group: 'Студент не состоит в группе',

  // Practice related
  practice_not_found: 'Практика не найдена',
  practice_student_not_found: 'Студент не найден',

  // Opportunity related
  opportunity_not_found: 'Возможность не найдена',
  opportunity_already_exists: 'Такая возможность уже существует',
  already_responded: 'Вы уже откликнулись на эту возможность',
  response_not_found: 'Отклик не найден',

  // Project related
  project_not_found: 'Проект не найден',
  project_already_exists: 'Проект с таким названием уже существует'
} as const;

export type ErrorMessageKey = keyof typeof ErrorMessages;

export type InvitationErrorKey =
  | 'invalid_invitation'
  | 'invintation_expired'
  | 'invintation_used'
  | 'invitation_not_found'
  | 'user_already_invited';
