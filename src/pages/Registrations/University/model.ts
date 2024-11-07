import { createEvent } from 'effector'

import { routes } from '@/shared/routing'

import {
  createFields,
  isEmailValid,
  isEmpty,
  isPasswordsEquals,
  setupValidation,
  validatePassword,
} from '../model'

export const currentRoute = routes.auth.university

export const pageMounted = createEvent()
export const registretionFormSubmitted = createEvent()

export const fields = createFields({
  university: {
    defaultValue: '',
    errorTypes: [null, 'empty'] as const,
    rules: [(value) => (isEmpty(value) ? 'empty' : null)],
  },
  contactName: {
    defaultValue: '',
    errorTypes: [null, 'empty'] as const,
    rules: [(value) => (isEmpty(value) ? 'empty' : null)],
  },
  address: {
    defaultValue: '',
    errorTypes: [null, 'empty'] as const,
    rules: [(value) => (isEmpty(value) ? 'empty' : null)],
  },
  email: {
    defaultValue: '',
    errorTypes: [null, 'empty', 'invalid'] as const,
    rules: [
      (value) => (isEmpty(value) ? 'empty' : null),
      (value) => (!isEmailValid(value) ? 'invalid' : null),
    ],
  },
  phone: {
    defaultValue: '',
    errorTypes: [null, 'empty'] as const,
    rules: [(value) => (isEmpty(value) ? 'empty' : null)],
  },
  password: {
    defaultValue: '',
    errorTypes: [
      null,
      'empty',
      'invalid_length',
      'no_uppercase',
      'no_lowercase',
      'no_digit',
      'no_special_char',
    ] as const,
    rules: [
      (value) => (isEmpty(value) ? 'empty' : null),
      (value) => validatePassword(value),
    ],
  },
  passwordRepeat: {
    defaultValue: '',
    errorTypes: [null, 'invalid'] as const,
    rules: [
      (value) =>
        // eslint-disable-next-line effector/no-getState
        !isPasswordsEquals(password.$value.getState(), value)
          ? 'invalid'
          : null,
    ],
  },
})

export const {
  university,
  email,
  contactName,
  phone,
  password,
  passwordRepeat,
  address,
} = fields

setupValidation(fields, registretionFormSubmitted)
