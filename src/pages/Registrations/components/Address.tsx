import { TextInput } from '@mantine/core'
import { useUnit } from 'effector-react'

import { address } from '../model'
import classes from './base.module.css'

const addressErrorText = {
  empty: 'Поле не может быть пустым',
}
export const Address = () => {
  const [addressName, addressError, addressChanged] = useUnit([
    address.$value,
    address.$error,
    address.$set,
  ])

  return (
    <TextInput
      value={addressName}
      onChange={(event) => addressChanged(event.target.value)}
      className={classes.input}
      description="Например: Московская область, г. Долгопрудный, Институтский переулок, д.9."
      label="Адрес"
      placeholder="Введите адрес университета"
      error={addressError ? addressErrorText[addressError] : null}
    />
  )
}
