import {
  Avatar,
  Button,
  Flex,
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

import { baseForm } from '@/pages/Profile/model'
import { withConditionalRender } from '@/shared/hoc'
import { AddPetProjectIcon } from '@/shared/icons/AddPetProjectIcon'
import { $user } from '@/shared/session'
import { getRoleInRussian } from '@/shared/utils'

import classes from './UserInfoIcons.module.css'

const ConditionalStudentProfileForm = withConditionalRender<{
  isStudent: boolean
}>(StudentProfileForm, (props) => props.isStudent)

const Profile = () => {
  const { isDirty, eachValid } = useForm(baseForm)
  const user = useUnit($user)

  if (!user) return null
  return (
    <Stack className="shell_main">
      <Group justify="space-between" wrap="wrap" gap="md">
        <UserTopInfo />
        <Button disabled={!isDirty || !eachValid}>Сохранить изменения</Button>
      </Group>
      <BaseUserForm />
      <ConditionalStudentProfileForm isStudent={user.role === 'STUDENT'} />
    </Stack>
  )
}

// eslint-disable-next-line import/no-default-export
export default Profile

function BaseUserForm() {
  const user = useUnit($user)
  const { fields } = useForm(baseForm)

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
            value={fields.firstName.value}
            onChange={(e) => fields.firstName.onChange(e.target.value)}
            error={fields.firstName.errorText()}
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

function StudentProfileForm() {
  return (
    <Stack>
      <Title order={3}>Профиль студента</Title>
      <Grid grow gutter="md">
        <Grid.Col span={{ base: 12, sm: 4, lg: 4 }}>
          <Flex direction="column" gap="xs">
            <TextInput
              label="Github"
              description="Ссылка на github"
              placeholder="https://github.com/zeroqs"
            />
            <TextInput
              label="Github"
              description="Ссылка на github"
              placeholder="https://github.com/zeroqs"
            />
            <TextInput label="Ваша группа" value="ИСТ-21-1" readOnly />
          </Flex>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 8, lg: 8 }}>
          <Stack align="center" justify="center" gap="md">
            <Button
              h="auto"
              variant="gradient"
              gradient={{ from: '#f0f9ff', to: '#e6f2ff' }}
              radius="md"
              p="md"
              className={classes.addPetProjectButton}
              w={{ base: '100%', sm: '80%' }}
            >
              <Stack gap={5} align="center">
                <AddPetProjectIcon width={280} height={180} />
                <Text fw={500} size="lg" c="blue.9">
                  Добавить учебный проект
                </Text>
              </Stack>
            </Button>
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  )
}
