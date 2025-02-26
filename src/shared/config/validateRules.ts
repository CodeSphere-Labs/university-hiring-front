import * as yup from 'yup'

import { createRule } from '@/shared/utils'

const REQUIRED_FIELD = 'Поле обязательно'
const EMAIL_ERROR_FIELD = 'Вы ввели не правильный email'

export const validateRules = {
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
