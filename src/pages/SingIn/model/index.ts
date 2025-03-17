import { sample } from 'effector'
import { createForm } from 'effector-forms'

import { signInMutation } from '@/pages/SingIn/api'
import { validateRules } from '@/shared/config/validateRules'
import {
  showError,
  showErrorNotificationFx,
} from '@/shared/notifications/model'
import { routes } from '@/shared/routing/index'
import { sessionQuery } from '@/shared/session/api'
import { chainAnonymous } from '@/shared/session/model'

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
  clock: signInMutation.finished.failure,
  filter: signInMutation.$failed.map((isFailed) => isFailed),
  target: showError('Ошибка входа'),
})
