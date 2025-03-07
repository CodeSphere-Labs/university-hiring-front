import {
  Avatar,
  Button,
  Grid,
  Group,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core'
import { IconAt } from '@tabler/icons-react'
import { useUnit } from 'effector-react'

import { $user } from '@/shared/session'
import { getRoleInRussian } from '@/shared/utils'

import classes from './UserInfoIcons.module.css'

const Profile = () => {
  return (
    <Stack className="shell_main">
      <Group justify="space-between" wrap="wrap" gap="md">
        <UserTopInfo />
        <Button onClick={() => console.log('object')}>
          Сохранить изменения
        </Button>
      </Group>
      <BaseUserForm />
    </Stack>
  )
}

// eslint-disable-next-line import/no-default-export
export default Profile

function BaseUserForm() {
  const user = useUnit($user)

  if (!user) return null

  return (
    <Group>
      <Title order={3}>Основная информация</Title>
      <Grid
        type="media"
        breakpoints={{
          xs: '300px',
          sm: '400px',
          md: '600px',
          lg: '1100px',
          xl: '1200px',
        }}
      >
        <Grid.Col span={{ sm: 12, md: 6, lg: 4 }}>
          <TextInput
            label="Имя"
            description="Ваше имя"
            placeholder="Введите имя"
            value={user.firstName}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <TextInput
            label="Фамилия"
            description="Ваша фамилия"
            placeholder="Введите фамилию"
            value={user.lastName}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <TextInput
            label="Отчество"
            description="Ваше отчество"
            placeholder="Введите отчество"
            value={user.patronymic}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <TextInput
            label="Email"
            description="Ваш email адрес"
            placeholder="Введите email"
            value={user.email}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <TextInput
            label="Telegram"
            description="Ссылка на ваш Telegram"
            placeholder="Введите ссылку на Telegram"
            value={user.telegramLink || ''}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <TextInput
            label="ВКонтакте"
            description="Ссылка на ваш профиль ВК"
            placeholder="Введите ссылку на ВК"
            value={user.vkLink || ''}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12 }}>
          <Textarea
            label="О себе"
            description="Расскажите о себе"
            placeholder="Введите информацию о себе"
            value={user.aboutMe || ''}
            minRows={3}
          />
        </Grid.Col>
      </Grid>
    </Group>
  )
}

function UserTopInfo() {
  const user = useUnit($user)
  if (!user) return null

  const userRole = getRoleInRussian(user.role)

  return (
    <div>
      <Group wrap="nowrap">
        <Avatar
          src={user.avatarUrl}
          alt={`${user.firstName} ${user.lastName}`}
          size={134}
          radius="md"
        />
        <div>
          <Text fz="xs" tt="uppercase" fw={700} c={userRole.color}>
            {userRole.label}
          </Text>

          <Text fz="lg" fw={500} className={classes.name}>
            {user.firstName} {user.lastName}
          </Text>
          <Group wrap="nowrap" gap={10} mt={3}>
            <IconAt stroke={1.5} size={16} className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {user.email}
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  )
}
