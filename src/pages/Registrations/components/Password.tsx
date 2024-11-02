import { TextInput } from '@mantine/core'
import { useUnit } from 'effector-react'

import { password } from '../model'
import classes from './base.module.css'

const passwordErrorText = {
  empty: 'Поле не может быть пустым',
  invalid_length: 'Пароль должен содержать не менее 8 символов',
  no_uppercase: 'Пароль должен содержать хотя бы 1 заглавную букву',
  no_lowercase: 'Пароль должен содержать хотя бы 1 строчную букву',
  no_digit: 'Пароль должен содержать хотя бы 1 цифру',
  no_special_char: 'Пароль должен содержать хотя бы 1 специальный символ',
}

export const Password = () => {
  const [passwordValue, passwordError, passwordChanged] = useUnit([
    password.$value,
    password.$error,
    password.$set,
  ])

  return (
    <TextInput
      value={passwordValue}
      onChange={(event) => passwordChanged(event.target.value)}
      className={classes.input}
      classNames={{ description: classes.description }}
      label="Пароль"
      placeholder="Придумайте пароль"
      description="Пароль должен содержать не менее 8 символов, включать одну заглавную букву, одну строчную букву, цифру и специальный символ (например, !@#$%)"
      error={passwordError ? passwordErrorText[passwordError] : null}
    />
  )
}
