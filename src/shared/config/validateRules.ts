import * as yup from 'yup'

import { createRule } from '@/shared/utils'

const VALIDATE_MESSAGES = {
  required: 'Поле обязательно',
  invalid: {
    email: 'Вы ввели не правильный email',
    telegram: 'Невалидная ссылка на Telegram',
    vk: 'Невалидная ссылка на ВКонтакте',
  },
} as const

export const validateRules = {
  required: createRule({
    name: 'required',
    schema: yup.string().required(VALIDATE_MESSAGES.required),
  }),
  email: createRule<string>({
    name: 'email',
    schema: yup
      .string()
      .email(VALIDATE_MESSAGES.invalid.email)
      .required(VALIDATE_MESSAGES.required),
  }),
  password: createRule<string>({
    name: 'password',
    schema: yup.string().required(VALIDATE_MESSAGES.required),
  }),
  telegramLink: createRule<string>({
    name: 'telegramLink',
    schema: yup
      .string()
      .nullable()
      .transform((value) => (value === '' ? null : value))
      .matches(
        /^https:\/\/t\.me\/[a-zA-Z0-9_]{5,32}$/,
        VALIDATE_MESSAGES.invalid.telegram,
      )
      .nullable(),
  }),
  vkLink: createRule<string>({
    name: 'vkLink',
    schema: yup
      .string()
      .nullable()
      .transform((value) => (value === '' ? null : value))
      .matches(
        /^https:\/\/vk\.com\/[a-zA-Z0-9_]{3,32}$/,
        VALIDATE_MESSAGES.invalid.vk,
      )
      .nullable(),
  }),
}
