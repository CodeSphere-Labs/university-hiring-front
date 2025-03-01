import { notifications } from '@mantine/notifications'
import { createEffect, sample } from 'effector'
import { createForm } from 'effector-forms'

import { signInMutation } from '@/pages/SingIn/api'
import { validateRules } from '@/shared/config/validateRules'
import { routes } from '@/shared/routing/index'
import { chainAnonymous, sessionQuery } from '@/shared/session'

export const currentRoute = routes.signIn
export const anonymousRoute = chainAnonymous(currentRoute, {
  otherwise: routes.home.open,
})

export const loginForm = createForm({
  fields: {
    email: {
      init: '',
      rules: [validateRules.required(), validateRules.email()],
    },
    password: {
      init: '',
      rules: [validateRules.password()],
    },
  },
  validateOn: ['submit'],
})

export const $pending = signInMutation.$pending.map((pending) => pending)

const showFailedNotificationFx = createEffect({
  handler: () =>
    notifications.show({
      color: 'red',
      title: 'Ошибка входа',
      message: 'Упс, что то пошло не так, попробуйте снова',
      position: 'top-right',
    }),
})

sample({
  clock: loginForm.formValidated,
  fn: ({ email, password }) => ({ email, password }),
  target: signInMutation.start,
})

sample({
  clock: signInMutation.finished.success,
  target: sessionQuery.start,
})

sample({
  clock: signInMutation.$failed,
  filter: signInMutation.$failed.map((isFailed) => isFailed),
  target: showFailedNotificationFx,
})
