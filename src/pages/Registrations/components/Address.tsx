import { TextInput } from '@mantine/core'
import { useUnit } from 'effector-react'

import { FieldModel } from '../model'
import classes from './base.module.css'

interface Props {
  model: FieldModel<string, 'empty'>
}

const addressErrorText = {
  empty: 'Поле не может быть пустым',
}
export const Address = ({ model }: Props) => {
  const [addressName, addressError, addressChanged] = useUnit([
    model.$value,
    model.$error,
    model.$set,
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
