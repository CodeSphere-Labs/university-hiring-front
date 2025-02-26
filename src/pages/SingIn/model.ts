import { createEffect, sample } from 'effector'
import { createForm } from 'effector-forms'

import { rules } from '@/shared/config/validateRules'
import { routes } from '@/shared/routing/index'

export const currentRoute = routes.signIn

export const loginForm = createForm({
  fields: {
    email: {
      init: '',
      rules: [rules.required(), rules.email()],
    },
    password: {
      validateOn: ['change'],
      init: '',
      rules: [rules.password()],
    },
  },
  validateOn: ['change'],
})

export const loginFx = createEffect()

sample({
  clock: loginForm.formValidated,
  target: loginFx,
})
