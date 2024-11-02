import { Input } from '@mantine/core'
import { useUnit } from 'effector-react'
import { IMaskInput } from 'react-imask'

import { phone } from '../model'
import classes from './base.module.css'

const phoneErrorText = {
  empty: 'Поле не может быть пустым',
  invalid: 'Неверный формат телефона',
}

export const Phone = () => {
  const [phoneValue, phoneError, phoneChanged] = useUnit([
    phone.$value,
    phone.$error,
    phone.$set,
  ])

  const onlyNumbers = (phone: string) => {
    return phone.replace(/\D/g, '')
  }

  return (
    <Input.Wrapper
      className={classes.input}
      label="Телефон"
      error={phoneError ? phoneErrorText[phoneError] : null}
    >
      <Input
        value={phoneValue}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onChange={(event) => phoneChanged(onlyNumbers(event.target.value))}
        component={IMaskInput}
        mask="+7 (000) 000-00-00"
        placeholder="Введите номер телефона"
        error={phoneError ? phoneErrorText[phoneError] : null}
      />
    </Input.Wrapper>
  )
}
