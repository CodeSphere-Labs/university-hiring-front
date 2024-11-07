import { TextInput } from '@mantine/core'
import { useUnit } from 'effector-react'

import { FieldModel } from '../model'
import classes from './base.module.css'

interface Props {
  model: FieldModel<string, 'empty'>
}

const industryErrorText = {
  empty: 'Поле не может быть пустым',
}

export const Industry = ({ model }: Props) => {
  const [industry, industryError, industryChanged] = useUnit([
    model.$value,
    model.$error,
    model.$set,
  ])

  return (
    <TextInput
      value={industry}
      onChange={(event) => industryChanged(event.target.value)}
      className={classes.input}
      label="Отрасль"
      placeholder="Укажите отрасль компании"
      error={industryError ? industryErrorText[industryError] : null}
    />
  )
}
