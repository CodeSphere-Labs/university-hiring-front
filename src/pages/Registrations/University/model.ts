import {
  createEvent,
  createStore,
  Event,
  sample,
  StoreWritable,
} from 'effector'

import { routes } from '@/shared/routing'

export const currentRoute = routes.auth.university

type ErrorType = 'empty' | 'invalid' | null

type ValidationRule<Value, Error extends ErrorType> = (
  value: Value,
) => Error | null

interface FieldConfig<Value, Error extends ErrorType> {
  defaultValue: Value
  errorTypes: Error[]
  rules: ValidationRule<Value, Error>[]
}

function createField<Value, Error extends ErrorType>(
  config: FieldConfig<Value, Error>,
) {
  const $value = createStore(config.defaultValue)
  const $error = createStore<Error | null>(null)
  const $set = createEvent<Value>()

  $value.on($set, (_, payload) => payload)
  return { $value, $set, $error, rules: config.rules }
}
function createFields<T extends Record<string, FieldConfig<any, any>>>(
  fields: T,
) {
  return Object.keys(fields).reduce(
    (acc, key) => {
      acc[key as keyof T] = createField(fields[key])
      return acc
    },
    {} as {
      [K in keyof T]: ReturnType<
        typeof createField<T[K]['defaultValue'], T[K]['errorTypes'][number]>
      >
    },
  )
}

const fields = createFields({
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
    errorTypes: [null, 'empty'] as const,
    rules: [
      (value) => (isEmpty(value) ? 'empty' : null),
      (value) => validatePassword(value),
    ],
  },
  passwordRepeat: {
    defaultValue: '',
    errorTypes: [null, 'invalid'] as const,
    rules: [(value) => (!isPasswordsEquals(value) ? 'invalid' : null)],
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

export const pageMounted = createEvent()
export const registretionFormSubmitted = createEvent()

function setupValidation<
  T extends Record<
    string,
    { $value: StoreWritable<any>; $error: StoreWritable<any>; rules: any }
  >,
>(fields: T, formSubmitEvent: Event<void>) {
  Object.values(fields).forEach((field) => {
    sample({
      clock: formSubmitEvent,
      source: field.$value,
      fn: (value) => {
        for (const rule of field.rules) {
          const error = rule(value)
          if (error) return error
        }
        return null
      },
      target: field.$error,
    })
  })
}
setupValidation(fields, registretionFormSubmitted)

function isEmailValid(email: string) {
  return email.includes('@') && email.length > 5
}

function validatePassword(
  password: string,
):
  | 'invalid_length'
  | 'no_uppercase'
  | 'no_lowercase'
  | 'no_digit'
  | 'no_special_char'
  | null {
  if (password.length < 8) {
    return 'invalid_length'
  }
  if (!/[A-Z]/.test(password)) {
    return 'no_uppercase'
  }
  if (!/[a-z]/.test(password)) {
    return 'no_lowercase'
  }
  if (!/[0-9]/.test(password)) {
    return 'no_digit'
  }
  if (!/[!@#$%^&*]/.test(password)) {
    return 'no_special_char'
  }
  return null
}

function isEmpty(input: string) {
  return input.trim().length === 0
}

function isPasswordsEquals(repeatedPassword: string) {
  // eslint-disable-next-line effector/no-getState
  return repeatedPassword === password.$value.getState()
}
