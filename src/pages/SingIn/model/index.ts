import { sample } from 'effector'
import { createForm } from 'effector-forms'

import { signInMutation } from '@/pages/SingIn/api'
import { validateRules } from '@/shared/config/validateRules'
import { routes } from '@/shared/routing/index'

export const currentRoute = routes.signIn

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
