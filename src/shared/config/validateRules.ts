import * as yup from 'yup';

import { createRule } from '@/shared/utils';

const VALIDATE_MESSAGES = {
  required: 'Поле обязательно',
  invalid: {
    email: 'Вы ввели не правильный email',
    telegram: 'Невалидная ссылка на Telegram',
    vk: 'Невалидная ссылка на ВКонтакте',
    github: 'Невалидная ссылка на Github',
    url: 'Невалидная ссылка'
  }
} as const;

export const validateRules = {
  required: () => ({
    name: 'required',
    validator: (value: string) => Boolean(value),
    errorText: 'Это поле обязательное'
  }),
  requiredArray: createRule({
    name: 'requiredArray',
    schema: yup.array().min(1, VALIDATE_MESSAGES.required)
  }),
  requiredObject: () => ({
    name: 'required',
    validator: (value: unknown) => Boolean(value),
    errorText: 'Это поле обязательное'
  }),
  email: () => ({
    name: 'email',
    validator: (value: string) => /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(value),
    errorText: 'Введите корректный email'
  }),
  password: createRule<string>({
    name: 'password',
    schema: yup.string().required(VALIDATE_MESSAGES.required)
  }),
  telegramLink: createRule<string>({
    name: 'telegramLink',
    schema: yup
      .string()
      .nullable()
      .transform((value) => (value === '' ? null : value))
      .matches(/^https:\/\/t\.me\/\w+$/, VALIDATE_MESSAGES.invalid.telegram)
      .nullable()
  }),
  vkLink: createRule<string>({
    name: 'vkLink',
    schema: yup
      .string()
      .nullable()
      .transform((value) => (value === '' ? null : value))
      .matches(/^https:\/\/vk\.com\/\w+$/, VALIDATE_MESSAGES.invalid.vk)
      .nullable()
  }),
  gitHubUserLink: createRule<string>({
    name: 'gitHubUserLink',
    schema: yup
      .string()
      .nullable()
      .transform((value) => (value === '' ? null : value))
      .matches(/^https:\/\/github\.com\/[\w-]+$/, VALIDATE_MESSAGES.invalid.github)
      .nullable()
  }),
  gitHubRepoLink: createRule<string>({
    name: 'gitHubRepoLink',
    schema: yup
      .string()
      .nullable()
      .transform((value) => (value === '' ? null : value))
      .matches(/^https:\/\/github\.com\/[\w-]+\/[\w-]+$/, VALIDATE_MESSAGES.invalid.github)
      .nullable()
  }),
  url: () => ({
    name: 'url',
    validator: (value: string) =>
      // eslint-disable-next-line regexp/no-unused-capturing-group, regexp/no-super-linear-backtracking, regexp/no-misleading-capturing-group
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*$/.test(value),
    errorText: 'Введите корректный URL'
  }),
  requiredGroup: () => ({
    name: 'required',
    validator: (value: unknown, { role }: { role: string }) =>
      role === 'STUDENT' ? Boolean(value) : true,
    errorText: 'Выберите группу'
  })
};
