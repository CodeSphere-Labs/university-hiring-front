import {
  Flex,
  Loader,
  MultiSelect,
  Stack,
  Textarea,
  TextInput,
} from '@mantine/core'
import { useForm } from 'effector-forms'
import { useUnit } from 'effector-react'

import {
  $addProjectLoading,
  projectForm,
} from '@/pages/Profile/model/addProject.model'
import {
  $availableGroupedSkills,
  $availableGroupedSkillsLoading,
} from '@/pages/Profile/model/model'

export const AddProjectModal = () => {
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
        comboboxProps={{
          position: 'bottom',
          middlewares: { flip: false, shift: true },
          withinPortal: false,
        }}
      />
    </Stack>
  )
}
