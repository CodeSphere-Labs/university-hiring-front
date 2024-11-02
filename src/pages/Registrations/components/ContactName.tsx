import { TextInput } from '@mantine/core'
import { useUnit } from 'effector-react'

import { contactName } from '../model'
import classes from '../University/University.module.css'

const contactNameErrorText = {
  empty: 'Поле не может быть пустым',
}
export const ContactName = () => {
  const [contact, contactError, contactChanged] = useUnit([
    contactName.$value,
    contactName.$error,
    contactName.$set,
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
