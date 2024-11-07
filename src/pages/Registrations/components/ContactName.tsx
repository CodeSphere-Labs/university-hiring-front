import { TextInput } from '@mantine/core'
import { useUnit } from 'effector-react'

import { FieldModel } from '../model'
import classes from './base.module.css'

interface Props {
  model: FieldModel<string, 'empty'>
}

const contactNameErrorText = {
  empty: 'Поле не может быть пустым',
}
export const ContactName = ({ model }: Props) => {
  const [contact, contactError, contactChanged] = useUnit([
    model.$value,
    model.$error,
    model.$set,
  ])

  return (
    <TextInput
      value={contact}
      onChange={(event) => contactChanged(event.target.value)}
      error={contactError ? contactNameErrorText[contactError] : null}
      className={classes.input}
      label="Контактное лицо"
      placeholder="Введите имя контактного лица"
    />
  )
}
