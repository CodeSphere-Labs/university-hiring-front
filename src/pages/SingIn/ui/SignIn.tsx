import type { FormEvent } from 'react';

import {
  Anchor,
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  TextInput,
  Title
} from '@mantine/core';
import { useForm } from 'effector-forms';
import { useUnit } from 'effector-react';

import { $pending, loginForm } from '../model/model';
import TestAccounts from './TestAccounts';

import classes from './styles.module.css';

const SignIn = () => {
  const { fields, submit, eachValid } = useForm(loginForm);
  const pending = useUnit($pending);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit();
  };

  const handleAccountSelect = (email: string, password: string) => {
    fields.email.onChange(email);
    fields.password.onChange(password);
  };

  return (
    <Container my={40} size={1200}>
      <Title className={classes.title} ta='center'>
        Приветствуем вас 🤗
      </Title>

      <Group align='flex-start' gap='xl' mt={30}>
        <Paper
          p={30}
          radius='md'
          style={{ flex: 1, minWidth: 400 }}
          component='form'
          onSubmit={onSubmit}
          shadow='md'
          withBorder
        >
          <TextInput
            required
            disabled={pending}
            label='Почта'
            value={fields.email.value}
            error={fields.email.errorText()}
            onChange={(e) => fields.email.onChange(e.target.value)}
            placeholder='you@yandex.ru'
          />
          <PasswordInput
            required
            disabled={pending}
            label='Пароль'
            mt='md'
            value={fields.password.value}
            error={fields.password.errorText()}
            onChange={(e) => fields.password.onChange(e.target.value)}
            placeholder='Введите пароль'
          />

          <Button fullWidth disabled={!eachValid} mt='xl' type='submit' loading={pending}>
            Войти
          </Button>

          <Group justify='center' mt='lg'>
            <Anchor size='sm' type='button' component='button'>
              Забыли пароль?
            </Anchor>
          </Group>
        </Paper>

        <div style={{ flex: 1, minWidth: 400 }}>
          <TestAccounts onAccountSelect={handleAccountSelect} />
        </div>
      </Group>
    </Container>
  );
};

export default SignIn;
