import { TextInput } from '@mantine/core'
import { useUnit } from 'effector-react'

import { email } from '../model'
import classes from '../University/University.module.css'

const emailErrorText = {
  empty: 'Email не может быть пустым',
  invalid: 'Неверный формат e-mail',
}

export const Email = () => {
  const [emailAddress, emailError, emailChanged] = useUnit([
    email.$value,
    email.$error,
    email.$set,
  ])

  return (
    <TextInput
      value={emailAddress}
      onChange={(event) => emailChanged(event.target.value)}
      className={classes.input}
      label="Электронная почта"
      placeholder="example@university.com"
      error={emailError ? emailErrorText[emailError] : null}
    />
  )
}
