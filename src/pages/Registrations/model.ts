import {
    createEvent,
    createStore,
    Event,
    EventCallable,
    sample,
    StoreWritable,
} from 'effector'

type ErrorType = 'empty' | 'invalid' | null

export interface FieldModel<Value, Error> {
  $value: StoreWritable<Value>
  $error: StoreWritable<Error | null>
  $set: EventCallable<Value>
}

type ValidationRule<Value, Error extends ErrorType> = (
  value: Value,
) => Error | null

interface FieldConfig<Value, Error extends ErrorType> {
  defaultValue: Value
  errorTypes: Error[]
  rules: ValidationRule<Value, Error>[]
}

export function createField<Value, Error extends ErrorType>(
  config: FieldConfig<Value, Error>,
) {
  const $value = createStore(config.defaultValue)
  const $error = createStore<Error | null>(null)
  const $set = createEvent<Value>()

  $value.on($set, (_, payload) => payload)
  return { $value, $set, $error, rules: config.rules }
}
export function createFields<T extends Record<string, FieldConfig<any, any>>>(
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

export function setupValidation<
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

export function isEmailValid(email: string) {
  return email.includes('@') && email.length > 5
}

export function validatePassword(
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

export function isEmpty(input: string) {
  return input.trim().length === 0
}

export function isPasswordsEquals(
  origignalPassword: string,
  repeatedPassword: string,
) {
  return origignalPassword === repeatedPassword
}
