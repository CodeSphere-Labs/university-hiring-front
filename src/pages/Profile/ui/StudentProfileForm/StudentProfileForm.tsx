import {
  Button,
  Flex,
  Grid,
  Loader,
  MultiSelect,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { useForm } from 'effector-forms'
import { useUnit } from 'effector-react'

import type {
  studentForm} from '@/pages/Profile/model/model';

import { projectModalOpened } from '@/pages/Profile/model/addProject.model'
import {
  $availableGroupedSkills,
  $availableGroupedSkillsLoading,
  $updateProfileLoading,
  getFormByRole
} from '@/pages/Profile/model/model'
import { withConditionalRender } from '@/shared/hoc'
import { AddPetProjectIcon } from '@/shared/icons/AddPetProjectIcon'
import { $user } from '@/shared/session/model'

import { Projects } from '../Projects/Projects'

import classes from './StudentProfileForm.module.css'

export const StudentProfileForm = () => {
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
      <Grid gutter="md" grow>
        <Grid.Col span={{ base: 12, sm: 4, lg: 4 }}>
          <Flex gap="xs" direction="column">
            <TextInput
              disabled={loading}
              label="Github"
              value={fields.githubLink.value}
              description="Ссылка на github"
              error={fields.githubLink.errorText()}
              onChange={(e) => fields.githubLink.onChange(e.target.value)}
              placeholder="https://github.com/zeroqs"
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
              readOnly
              disabled={loading}
              label="Ваша группа"
              value={fields.group.value}
            />
            <MultiSelect
              clearable
              searchable
              data={availableGroupedSkills}
              disabled={availableGroupedSkillsLoading || loading}
              label="Ваши навыки"
              value={fields.skills.value}
              error={fields.skills.errorText()}
              hidePickedOptions
              nothingFoundMessage="Ничего не найдено"
              onChange={(e) => fields.skills.onChange(e)}
              rightSection={
                availableGroupedSkillsLoading && <Loader size={16} />
              }
            />
          </Flex>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 8, lg: 8 }}>
          <Stack align="center" gap="md" justify="center">
            <Button
              className={classes.addPetProjectButton}
              disabled={loading}
              gradient={{ from: '#f0f9ff', to: '#e6f2ff' }}
              h="auto"
              p="md"
              radius="md"
              variant="gradient"
              w={{ base: '100%', sm: '80%' }}
              onClick={() => projectModalOpened()}
            >
              <Stack align="center" gap={5}>
                <AddPetProjectIcon height={180} width={280} />
                <Text c="dark.9" fw={500} size="lg">
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

export const ConditionalStudentProfile = withConditionalRender<{
  isStudent: boolean
}>(StudentProfileForm, (props) => props.isStudent)
