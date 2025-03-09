import { sample } from 'effector'
import { createForm } from 'effector-forms'

import { validateRules } from '@/shared/config/validateRules'
import { routes } from '@/shared/routing/index'
import { chainAuthorized } from '@/shared/session'
import { sessionQuery } from '@/shared/session/api'

export const currentRoute = routes.profile
export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.signIn.open,
})

export const baseForm = createForm({
  fields: {
    firstName: {
      init: '',
      rules: [validateRules.required()],
      validateOn: ['change'],
    },
    lastName: {
      init: '',
      rules: [validateRules.required()],
      validateOn: ['change'],
    },
    patronymic: {
      init: '',
      rules: [validateRules.required()],
      validateOn: ['change'],
    },
    email: {
      init: '',
      rules: [validateRules.required(), validateRules.email()],
    },
    aboutMe: {
      init: '',
      rules: [validateRules.required()],
    },
    telegramLink: {
      init: '',
      rules: [validateRules.required(), validateRules.telegramLink()],
    },
    vkLink: {
      init: '',
      rules: [validateRules.required(), validateRules.vkLink()],
    },
  },
  validateOn: ['submit'],
})

sample({
  clock: sessionQuery.finished.success,
  fn: ({ result }) => ({
    firstName: result.firstName,
    lastName: result.lastName,
    patronymic: result.patronymic,
    email: result.email,
    aboutMe: result.aboutMe || '',
    telegramLink: result.telegramLink || '',
    vkLink: result.vkLink || '',
  }),
  target: baseForm.setInitialForm,
})
