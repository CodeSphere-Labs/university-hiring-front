import {
  Avatar,
  Button,
  Grid,
  Group,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title
} from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import { useForm } from 'effector-forms';
import { useUnit } from 'effector-react';

import type { User } from '@/shared/api/types';

import { $user } from '@/shared/session/model';
import { getRole } from '@/shared/utils';

import type { baseForm } from '../model/model';

import { $updateProfileLoading, getFormByRole } from '../model/model';
import { ConditionalStudentProfile } from './StudentProfileForm/StudentProfileForm';

import classes from './UserInfoIcons.module.css';

const UserTopInfo = ({ user }: { user: User }) => {
  const userRole = getRole(user.role);

  return (
    <div>
      <Group wrap='nowrap'>
        <Avatar
          alt={`${user.firstName} ${user.lastName}`}
          radius='md'
          size={134}
          src={user.avatarUrl}
        />
        <div>
          <Text c={userRole.color} fw={700} fz='xs' tt='uppercase'>
            {userRole.label}
          </Text>

          <Text className={classes.name} fw={500} fz='lg'>
            {user.firstName} {user.lastName}
          </Text>
          <Group gap={10} mt={3} wrap='nowrap'>
            <IconAt className={classes.icon} size={16} stroke={1.5} />
            <Text c='dimmed' fz='xs'>
              {user.email}
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
};

const BaseUserForm = ({ user }: { user: User }) => {
  const loading = useUnit($updateProfileLoading);
  const form = getFormByRole(user.role);
  const { fields } = useForm(form as typeof baseForm);

  return (
    <Group>
      <Title order={3}>Основная информация</Title>
      <Grid
        type='media'
        breakpoints={{
          xs: '300px',
          sm: '400px',
          md: '600px',
          lg: '1100px',
          xl: '1200px'
        }}
      >
        <Grid.Col span={{ sm: 12, md: 6, lg: 4 }}>
          <TextInput
            required
            disabled={loading}
            label='Имя'
            value={fields.firstName.value}
            description='Ваше имя'
            error={fields.firstName.errorText()}
            onChange={(e) => fields.firstName.onChange(e.target.value)}
            placeholder='Введите имя'
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <TextInput
            required
            disabled={loading}
            label='Фамилия'
            value={fields.lastName.value}
            description='Ваша фамилия'
            error={fields.lastName.errorText()}
            onChange={(e) => fields.lastName.onChange(e.target.value)}
            placeholder='Введите фамилию'
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <TextInput
            required
            disabled={loading}
            label='Отчество'
            value={fields.patronymic.value}
            description='Ваше отчество'
            error={fields.patronymic.errorText()}
            onChange={(e) => fields.patronymic.onChange(e.target.value)}
            placeholder='Введите отчество'
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <TextInput
            required
            disabled={loading}
            label='Email'
            value={fields.email.value}
            description='Ваш email адрес'
            onChange={(e) => fields.email.onChange(e.target.value)}
            placeholder='Введите email'
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <TextInput
            disabled={loading}
            label='Telegram'
            value={fields.telegramLink.value}
            description='Ссылка на ваш Telegram'
            error={fields.telegramLink.errorText()}
            onChange={(e) => fields.telegramLink.onChange(e.target.value)}
            placeholder='https://t.me/username'
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <TextInput
            disabled={loading}
            label='ВКонтакте'
            value={fields.vkLink.value}
            description='Ссылка на ваш профиль ВК'
            error={fields.vkLink.errorText()}
            onChange={(e) => fields.vkLink.onChange(e.target.value)}
            placeholder='https://vk.com/username'
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12 }}>
          <Textarea
            disabled={loading}
            label='О себе'
            value={fields.aboutMe.value}
            description='Расскажите о себе'
            error={fields.aboutMe.errorText()}
            minRows={3}
            onChange={(e) => fields.aboutMe.onChange(e.target.value)}
            placeholder='Введите информацию о себе'
          />
        </Grid.Col>
      </Grid>
    </Group>
  );
};

const ProfileContent = ({ user }: { user: User }) => {
  const [loading] = useUnit([$updateProfileLoading]);

  const form = getFormByRole(user.role);
  const { isDirty, eachValid, submit } = useForm(form as typeof baseForm);

  const onHandleSubmit = () => submit();

  return (
    <Stack className='shell_main'>
      <Group gap='md' justify='space-between' wrap='wrap'>
        <UserTopInfo user={user} />
        <Button disabled={!isDirty || !eachValid} loading={loading} onClick={onHandleSubmit}>
          Сохранить изменения
        </Button>
      </Group>
      <BaseUserForm user={user} />
      <ConditionalStudentProfile isStudent={user.role === 'STUDENT'} />
    </Stack>
  );
};

const Profile = () => {
  const user = useUnit($user);

  if (!user) return null;

  return <ProfileContent user={user} />;
};

export default Profile;
