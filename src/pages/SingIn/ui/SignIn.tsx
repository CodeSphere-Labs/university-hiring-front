import {
  Anchor,
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from '@mantine/core'
import { useForm } from 'effector-forms'
import { useUnit } from 'effector-react'
import { FormEvent } from 'react'

import { $pending, loginForm } from '../model/model'
import classes from './SignIn.module.css'

const SignIn = () => {
  const { fields, submit, eachValid } = useForm(loginForm)
  const pending = useUnit($pending)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    submit()
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Приветствуем вас 🤗
      </Title>

      <Paper
        onSubmit={onSubmit}
        component="form"
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
      >
        <TextInput
          error={fields.email.errorText()}
          label="Почта"
          value={fields.email.value}
          disabled={pending}
          onChange={(e) => fields.email.onChange(e.target.value)}
          placeholder="you@yandex.ru"
          required
        />
        <PasswordInput
          error={fields.password.errorText()}
          label="Пароль"
          placeholder="Введите пароль"
          required
          mt="md"
          value={fields.password.value}
          disabled={pending}
          onChange={(e) => fields.password.onChange(e.target.value)}
        />

        <Button
          loading={pending}
          disabled={!eachValid}
          type="submit"
          fullWidth
          mt="xl"
        >
          Войти
        </Button>

        <Group justify="center" mt="lg">
          <Anchor component="button" size="sm">
            Забыли пароль?
          </Anchor>
        </Group>
      </Paper>
    </Container>
  )
}

// eslint-disable-next-line import/no-default-export
export default SignIn
