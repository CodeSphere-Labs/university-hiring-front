import { TextInput } from '@mantine/core'
import { useUnit } from 'effector-react'

import { FieldModel } from '../model'
import classes from './base.module.css'

interface Props {
  model: FieldModel<string, 'empty' | 'invalid'>
}

const emailErrorText = {
  empty: 'Email не может быть пустым',
  invalid: 'Неверный формат e-mail',
}

export const Email = ({ model }: Props) => {
  const [emailAddress, emailError, emailChanged] = useUnit([
    model.$value,
    model.$error,
    model.$set,
  ])

  return (
    <TextInput
      value={emailAddress}
      onChange={(event) => emailChanged(event.target.value)}
      className={classes.input}
      label="Электронная почта"
      placeholder="example@domain.com"
      error={emailError ? emailErrorText[emailError] : null}
    />
  )
}
