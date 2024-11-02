import { TextInput } from '@mantine/core'
import { useUnit } from 'effector-react'

import { university } from '../model'
import classes from '../University/University.module.css'

const universityErrorText = {
  empty: 'Поле не может быть пустым',
  invalid: 'Поле не может быть пустым',
}
export const UniversityName = () => {
  const [universityName, universityError, universityNameChanged] = useUnit([
    university.$value,
    university.$error,
    university.$set,
  ])

  return (
    <TextInput
      value={universityName}
      onChange={(event) => universityNameChanged(event.target.value)}
      className={classes.input}
      label="Название университета"
      placeholder="Введите название университета"
      error={universityError ? universityErrorText[universityError] : null}
    />
  )
}
