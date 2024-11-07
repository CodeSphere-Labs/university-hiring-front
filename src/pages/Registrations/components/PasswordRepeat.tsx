import { TextInput } from '@mantine/core'
import { useUnit } from 'effector-react'

import { FieldModel } from '../model'
import classes from './base.module.css'

interface Props {
  model: FieldModel<string, 'invalid'>
}

const passwordRepeatErrorText = {
  invalid: 'Пароли не совпадают',
}
export const PasswordRepeat = ({ model }: Props) => {
  const [passwordValue, passwordError, passwordChanged] = useUnit([
    model.$value,
    model.$error,
    model.$set,
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
