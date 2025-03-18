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

import { projectModalOpened } from '@/pages/Profile/model/addProject.model'
import {
  $availableGroupedSkills,
  $availableGroupedSkillsLoading,
  $updateProfileLoading,
  getFormByRole,
  studentForm,
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

export const ConditionalStudentProfile = withConditionalRender<{
  isStudent: boolean
}>(StudentProfileForm, (props) => props.isStudent)
