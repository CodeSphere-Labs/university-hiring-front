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
import { useForm } from 'effector-forms'
import { useUnit } from 'effector-react'

import { $user } from '@/shared/session/model'
import { getRole } from '@/shared/utils'

import { $updateProfileLoading, baseForm, getFormByRole } from '../model/model'
import { ConditionalStudentProfile } from './StudentProfileForm/StudentProfileForm'
import classes from './UserInfoIcons.module.css'

const Profile = () => {
  const user = useUnit($user)
  if (!user) return null
  return <ProfileContent />
}

// eslint-disable-next-line import/no-default-export
export default Profile

const ProfileContent = () => {
  const [user, loading] = useUnit([$user, $updateProfileLoading])
  if (!user) return null

  const form = getFormByRole(user.role)
  const { isDirty, eachValid, submit } = useForm(form as typeof baseForm)

  const onHandleSubmit = () => submit()

  return (
    <Stack className="shell_main">
      <Group justify="space-between" wrap="wrap" gap="md">
        <UserTopInfo />
        <Button
          onClick={onHandleSubmit}
          loading={loading}
          disabled={!isDirty || !eachValid}
        >
          Сохранить изменения
        </Button>
      </Group>
      <BaseUserForm />
      <ConditionalStudentProfile isStudent={user.role === 'STUDENT'} />
    </Stack>
  )
}

function BaseUserForm() {
  const user = useUnit($user)
  if (!user) return null

  const loading = useUnit($updateProfileLoading)
  const form = getFormByRole(user.role)
  const { fields } = useForm(form as typeof baseForm)

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
            value={fields.firstName.value}
            onChange={(e) => fields.firstName.onChange(e.target.value)}
            error={fields.firstName.errorText()}
            disabled={loading}
            required
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <TextInput
            label="Фамилия"
            description="Ваша фамилия"
            placeholder="Введите фамилию"
            value={fields.lastName.value}
            onChange={(e) => fields.lastName.onChange(e.target.value)}
            error={fields.lastName.errorText()}
            disabled={loading}
            required
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <TextInput
            label="Отчество"
            description="Ваше отчество"
            placeholder="Введите отчество"
            value={fields.patronymic.value}
            onChange={(e) => fields.patronymic.onChange(e.target.value)}
            error={fields.patronymic.errorText()}
            disabled={loading}
            required
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <TextInput
            label="Email"
            description="Ваш email адрес"
            placeholder="Введите email"
            value={fields.email.value}
            onChange={(e) => fields.email.onChange(e.target.value)}
            disabled={loading}
            required
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <TextInput
            label="Telegram"
            description="Ссылка на ваш Telegram"
            placeholder="https://t.me/username"
            value={fields.telegramLink.value}
            onChange={(e) => fields.telegramLink.onChange(e.target.value)}
            error={fields.telegramLink.errorText()}
            disabled={loading}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <TextInput
            label="ВКонтакте"
            description="Ссылка на ваш профиль ВК"
            placeholder="https://vk.com/username"
            value={fields.vkLink.value}
            onChange={(e) => fields.vkLink.onChange(e.target.value)}
            error={fields.vkLink.errorText()}
            disabled={loading}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12 }}>
          <Textarea
            label="О себе"
            description="Расскажите о себе"
            placeholder="Введите информацию о себе"
            value={fields.aboutMe.value}
            onChange={(e) => fields.aboutMe.onChange(e.target.value)}
            minRows={3}
            error={fields.aboutMe.errorText()}
            disabled={loading}
          />
        </Grid.Col>
      </Grid>
    </Group>
  )
}

function UserTopInfo() {
  const user = useUnit($user)
  if (!user) return null

  const userRole = getRole(user.role)

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
