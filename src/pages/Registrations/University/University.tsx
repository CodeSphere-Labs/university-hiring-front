import {
  Button,
  Center,
  Flex,
  Grid,
  Input,
  TextInput,
  Title,
} from '@mantine/core'
import { useUnit } from 'effector-react'
import { FormEventHandler, useEffect } from 'react'
import { IMaskInput } from 'react-imask'

import {
  address,
  contactName,
  email,
  pageMounted,
  password,
  passwordRepeat,
  phone,
  registretionFormSubmitted,
  university,
} from './model'
import classes from './University.module.css'

const University = () => {
  useEffect(() => {
    pageMounted()
  }, [])

  const onFormSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    registretionFormSubmitted()
  }

  return (
    <Center className={classes.main}>
      <Flex
        gap="md"
        justify="flex-start"
        align="center"
        direction="column"
        wrap="wrap"
      >
        <Title order={2}>Регистрация университета</Title>

        <form className={classes.form} onSubmit={onFormSubmit}>
          <Grid>
            <Grid.Col span={{ xs: 12, sm: 6 }}>
              <UniversityName />
              <ContactName />
              <Address />
            </Grid.Col>
            <Grid.Col span={{ xs: 12, sm: 6 }}>
              <Email />
              <Phone />
            </Grid.Col>
          </Grid>

          <Password />
          <PasswordRepeat />

          <Button type="submit" mt={15} w="100%">
            Зарегистрироваться
          </Button>
        </form>
      </Flex>
    </Center>
  )
}

// eslint-disable-next-line import/no-default-export
export default University

const universityErrorText = {
  empty: 'Поле не может быть пустым',
  invalid: 'Поле не может быть пустым',
}
function UniversityName() {
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

const contactNameErrorText = {
  empty: 'Поле не может быть пустым',
}
function ContactName() {
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

const addressErrorText = {
  empty: 'Поле не может быть пустым',
}
function Address() {
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

const emailErrorText = {
  empty: 'Email не может быть пустым',
  invalid: 'Неверный формат e-mail',
}

function Email() {
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

const phoneErrorText = {
  empty: 'Поле не может быть пустым',
  invalid: 'Неверный формат телефона',
}

function Phone() {
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

const passwordErrorText = {
  empty: 'Поле не может быть пустым',
  invalid_length: 'Пароль должен содержать не менее 8 символов',
  no_uppercase: 'Пароль должен содержать хотя бы 1 заглавную букву',
  no_lowercase: 'Пароль должен содержать хотя бы 1 строчную букву',
  no_digit: 'Пароль должен содержать хотя бы 1 цифру',
  no_special_char: 'Пароль должен содержать хотя бы 1 специальный символ',
}

function Password() {
  const [passwordValue, passwordError, passwordChanged] = useUnit([
    password.$value,
    password.$error,
    password.$set,
  ])

  return (
    <TextInput
      value={passwordValue}
      onChange={(event) => passwordChanged(event.target.value)}
      className={classes.input}
      classNames={{ description: classes.description }}
      label="Пароль"
      placeholder="Придумайте пароль"
      description="Пароль должен содержать не менее 8 символов, включать одну заглавную букву, одну строчную букву, цифру и специальный символ (например, !@#$%)"
      error={passwordError ? passwordErrorText[passwordError] : null}
    />
  )
}

const passwordRepeatErrorText = {
  invalid: 'Пароли не совпадают',
}

function PasswordRepeat() {
  const [passwordValue, passwordError, passwordChanged] = useUnit([
    passwordRepeat.$value,
    passwordRepeat.$error,
    passwordRepeat.$set,
  ])

  return (
    <TextInput
      value={passwordValue}
      onChange={(event) => passwordChanged(event.target.value)}
      className={classes.input}
      label="Подтверждение пароля"
      placeholder="Повторите пароль"
      error={passwordError ? passwordRepeatErrorText[passwordError] : null}
    />
  )
}
