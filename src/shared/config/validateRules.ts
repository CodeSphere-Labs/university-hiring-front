import { Rule } from 'effector-forms'
import * as yup from 'yup'

export function createRule<V, T = any>({
  schema,
  name,
}: {
  schema: yup.Schema<T>
  name: string
}): () => Rule<V> {
  return () => ({
    name,
    validator: (v: V) => {
      try {
        schema.validateSync(v)
        return {
          isValid: true,
          value: v,
        }
      } catch (error) {
        return {
          isValid: false,
          value: v,
          errorText: (error as Error).message,
        }
      }
    },
  })
}

const REQUIRED_FIELD = 'Поле обязательно'
const EMAIL_ERROR_FIELD = 'Вы ввели не правильный email'

export const rules = {
  required: createRule({
    name: 'required',
    schema: yup.string().required(REQUIRED_FIELD),
  }),
  email: createRule<string>({
    name: 'email',
    schema: yup.string().email(EMAIL_ERROR_FIELD).required(REQUIRED_FIELD),
  }),
  password: createRule<string>({
    name: 'password',
    schema: yup.string().required(REQUIRED_FIELD),
  }),
}
