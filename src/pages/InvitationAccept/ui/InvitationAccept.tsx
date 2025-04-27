import {
  Button,
  Container,
  Group,
  Image,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title
} from '@mantine/core';
import { useForm } from 'effector-forms';
import { useUnit } from 'effector-react';

import { ErrorMessages } from '@/shared/config/errorCodes';
import IconInvitationError from '@/shared/images/InvitationError.png';
import { LoadingPage } from '@/shared/ui/LoadingPage/LoadingPage';

import { $error, $loading, $loadingAccept, form } from '../model/model';

const ErrorStatus = () => {
  const error = useUnit($error);
  if (!error) return null;

  return (
    <Container my={40}>
      <Stack align='center'>
        <Title order={2}>{ErrorMessages[error]}</Title>
        <Image src={IconInvitationError} w={800} />
      </Stack>
    </Container>
  );
};

const InvitationAccept = () => {
  const [error, loading, loadingAccept] = useUnit([$error, $loading, $loadingAccept]);
  const { fields, submit, eachValid, isDirty } = useForm(form);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorStatus />;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };

  return (
    <Container my={40} size={520}>
      <Title mb={30} ta='center'>
        Принять приглашение
      </Title>

      <Paper p={30} radius='md' component='form' onSubmit={handleSubmit} shadow='md' withBorder>
        <Group mb={15} grow>
          <TextInput
            required
            disabled={loadingAccept}
            label='Имя'
            value={fields.firstName.value}
            error={fields.firstName.errorText()}
            onChange={(e) => fields.firstName.onChange(e.target.value)}
            placeholder='Имя'
          />
          <TextInput
            required
            disabled={loadingAccept}
            label='Фамилия'
            value={fields.lastName.value}
            error={fields.lastName.errorText()}
            onChange={(e) => fields.lastName.onChange(e.target.value)}
            placeholder='Фамилия'
          />
        </Group>

        <TextInput
          required
          disabled={loadingAccept}
          label='Отчество'
          mb={15}
          value={fields.patronymic.value}
          error={fields.patronymic.errorText()}
          onChange={(e) => fields.patronymic.onChange(e.target.value)}
          placeholder='Отчество'
        />

        <PasswordInput
          required
          disabled={loadingAccept}
          label='Пароль'
          mb={30}
          value={fields.password.value}
          error={fields.password.errorText()}
          onChange={(e) => fields.password.onChange(e.target.value)}
          placeholder='Пароль'
        />

        <Button
          fullWidth
          disabled={loadingAccept || !isDirty || !eachValid}
          size='md'
          type='submit'
        >
          Зарегистрироваться
        </Button>
      </Paper>
    </Container>
  );
};

export default InvitationAccept;
