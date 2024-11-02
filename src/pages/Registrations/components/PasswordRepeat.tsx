import { TextInput } from '@mantine/core'
import { useUnit } from 'effector-react'

import { passwordRepeat } from '../model'
import classes from './base.module.css'

const passwordRepeatErrorText = {
  invalid: 'Пароли не совпадают',
}
export const PasswordRepeat = () => {
  const [passwordValue, passwordError, passwordChanged] = useUnit([
    passwordRepeat.$value,
    passwordRepeat.$error,
    passwordRepeat.$set,
  ])

  return (
    <TextInput
      value={passwordValue}
      onChange={(event) => passwordChanged(event.target.value)}
      className={classes.input}
      label="Подтверждение пароля"
      placeholder="Повторите пароль"
      error={passwordError ? passwordRepeatErrorText[passwordError] : null}
    />
  )
}
