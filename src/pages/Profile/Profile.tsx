import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Card,
  FileInput,
  Flex,
  Grid,
  Group,
  Loader,
  MultiSelect,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core'
import { IconAt, IconTrash } from '@tabler/icons-react'
import { useForm } from 'effector-forms'
import { useUnit } from 'effector-react'

import {
  $addProjectLoading,
  projectForm,
  projectModalOpened,
} from '@/pages/Profile/addProject.model'
import { withConditionalRender } from '@/shared/hoc'
import { AddPetProjectIcon } from '@/shared/icons/AddPetProjectIcon'
import { $user } from '@/shared/session/model'
import { getRole } from '@/shared/utils'

import {
  $availableGroupedSkills,
  $availableGroupedSkillsLoading,
  $updateProfileLoading,
  baseForm,
  getFormByRole,
  projectDeleted,
  studentForm,
} from './model'
import classes from './UserInfoIcons.module.css'

const ConditionalStudentProfileForm = withConditionalRender<{
  isStudent: boolean
}>(StudentProfileForm, (props) => props.isStudent)

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
      <ConditionalStudentProfileForm isStudent={user.role === 'STUDENT'} />
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

function StudentProfileForm() {
  const user = useUnit($user)
  const [availableGroupedSkills, availableGroupedSkillsLoading, loading] =
    useUnit([
      $availableGroupedSkills,
      $availableGroupedSkillsLoading,
      $updateProfileLoading,
    ])
  const form = getFormByRole(user?.role || '')
  const { fields } = useForm(form as typeof studentForm)

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
              value={fields.githubLink.value}
              onChange={(e) => fields.githubLink.onChange(e.target.value)}
              error={fields.githubLink.errorText()}
              disabled={loading}
            />
            {/* <FileInput
              label="Резюме"
              description="Резюме в формате pdf"
              placeholder="Прикрепите резюме"
              onChange={(e) => fields.resume.onChange(e)}
              error={fields.resume.errorText()}
              disabled={loading}
            /> */}
            <TextInput
              label="Ваша группа"
              value={fields.group.value}
              readOnly
              disabled={loading}
            />
            <MultiSelect
              label="Ваши навыки"
              value={fields.skills.value}
              onChange={(e) => fields.skills.onChange(e)}
              data={availableGroupedSkills}
              rightSection={
                availableGroupedSkillsLoading && <Loader size={16} />
              }
              disabled={availableGroupedSkillsLoading || loading}
              nothingFoundMessage="Ничего не найдено"
              searchable
              hidePickedOptions
              clearable
              error={fields.skills.errorText()}
            />
          </Flex>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 8, lg: 8 }}>
          <Stack align="center" justify="center" gap="md">
            <Button
              disabled={loading}
              h="auto"
              variant="gradient"
              gradient={{ from: '#f0f9ff', to: '#e6f2ff' }}
              radius="md"
              p="md"
              className={classes.addPetProjectButton}
              w={{ base: '100%', sm: '80%' }}
              onClick={() => projectModalOpened()}
            >
              <Stack gap={5} align="center">
                <AddPetProjectIcon width={280} height={180} />
                <Text fw={500} size="lg" c="dark.9">
                  Добавить учебный проект
                </Text>
              </Stack>
            </Button>
          </Stack>
        </Grid.Col>
      </Grid>

      <Projects />
    </Stack>
  )
}

function Projects() {
  const user = useUnit($user)

  if (!user?.studentProfile) return null

  return (
    <>
      <Title order={3}>Твои проекты</Title>
      <Grid>
        {user.studentProfile.projects?.map((project) => (
          <Grid.Col key={project.name} span={{ base: 12, sm: 6, lg: 4 }}>
            <Card withBorder radius="md" p="md" className={classes.card}>
              <Card.Section className={classes.section} mt="sm">
                <Group justify="space-between">
                  <Stack gap={0}>
                    <Badge variant="dot">Название проекта</Badge>
                    <Text fz="lg" fw={500}>
                      {project.name}
                    </Text>
                  </Stack>
                  <ActionIcon
                    onClick={() => projectDeleted(project.id)}
                    variant="subtle"
                    size="lg"
                    color="red"
                  >
                    <IconTrash />
                  </ActionIcon>
                </Group>
                <Stack gap={0} mt="md">
                  <Badge variant="dot">О проекте</Badge>
                  <Text fz="sm">{project.description}</Text>
                </Stack>
              </Card.Section>

              <Card.Section className={classes.section}>
                <Text mt="md" className={classes.label} c="dimmed">
                  Технологии
                </Text>
                <Group gap={7} mt={5}>
                  {project.technologies.map((technology) => (
                    <Badge key={technology} variant="light">
                      {technology}
                    </Badge>
                  ))}
                </Group>
              </Card.Section>

              <Group mt="xs">
                <Button
                  component="a"
                  href={project.githubUrl}
                  target="_blank"
                  radius="md"
                  style={{ flex: 1 }}
                >
                  Перейти на github
                </Button>
              </Group>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </>
  )
}

export function AddProjectModalForm() {
  const { fields } = useForm(projectForm)
  const [availableGroupedSkills, availableGroupedSkillsLoading, loading] =
    useUnit([
      $availableGroupedSkills,
      $availableGroupedSkillsLoading,
      $addProjectLoading,
    ])
  return (
    <Stack>
      <TextInput
        label="Название проекта"
        description="Введите название проекта"
        value={fields.name.value}
        onChange={(e) => fields.name.onChange(e.target.value)}
        error={fields.name.errorText()}
        required
        disabled={loading}
      />
      <Flex gap="md" wrap={{ base: 'wrap', sm: 'nowrap' }}>
        <TextInput
          label="Ссылка на github"
          description="Введите ссылку на github"
          w={{ base: '100%', sm: '50%' }}
          value={fields.githubUrl.value}
          onChange={(e) => fields.githubUrl.onChange(e.target.value)}
          error={fields.githubUrl.errorText()}
          required
          disabled={loading}
        />
        <TextInput
          label="Ссылка на сайт"
          description="Введите ссылку на сайт (если есть)"
          w={{ base: '100%', sm: '50%' }}
          value={fields.websiteUrl.value}
          onChange={(e) => fields.websiteUrl.onChange(e.target.value)}
          error={fields.websiteUrl.errorText()}
        />
      </Flex>
      <Textarea
        label="Описание проекта"
        description="Введите описание проекта"
        value={fields.description.value}
        onChange={(e) => fields.description.onChange(e.target.value)}
        error={fields.description.errorText()}
        required
        disabled={loading}
      />
      <MultiSelect
        label="Технологии используемые в проекте"
        description="Выберите технологии используемые в проекте"
        nothingFoundMessage="Ничего не найдено"
        searchable
        hidePickedOptions
        clearable
        required
        rightSection={availableGroupedSkillsLoading && <Loader size={16} />}
        disabled={availableGroupedSkillsLoading || loading}
        data={availableGroupedSkills}
        value={fields.technologies.value}
        onChange={(e) => fields.technologies.onChange(e)}
        error={fields.technologies.errorText()}
        comboboxProps={{ withinPortal: false }}
      />
    </Stack>
  )
}
