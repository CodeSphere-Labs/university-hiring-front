import { TextInput, TextInputProps } from '@mantine/core'
import { useUnit } from 'effector-react'

import { FieldModel } from '../model'
import classes from './base.module.css'

interface Props extends TextInputProps {
  model: FieldModel<string, 'empty' >
}

const universityErrorText = {
  empty: 'Поле не может быть пустым',
}
export const OrganizationName = ({ model, ...props }: Props) => {
  const [universityName, universityError, universityNameChanged] = useUnit([
    model.$value,
    model.$error,
    model.$set,
  ])

  return (
    <TextInput
      value={universityName}
      onChange={(event) => universityNameChanged(event.target.value)}
      className={classes.input}
      error={universityError ? universityErrorText[universityError] : null}
      {...props}
    />
  )
}
