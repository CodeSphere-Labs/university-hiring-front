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
        required
        disabled={loading}
        label="Название проекта"
        value={fields.name.value}
        description="Введите название проекта"
        error={fields.name.errorText()}
        onChange={(e) => fields.name.onChange(e.target.value)}
      />
      <Flex gap="md" wrap={{ base: 'wrap', sm: 'nowrap' }}>
        <TextInput
          required
          disabled={loading}
          label="Ссылка на github"
          value={fields.githubUrl.value}
          w={{ base: '100%', sm: '50%' }}
          description="Введите ссылку на github"
          error={fields.githubUrl.errorText()}
          onChange={(e) => fields.githubUrl.onChange(e.target.value)}
        />
        <TextInput
          label="Ссылка на сайт"
          value={fields.websiteUrl.value}
          w={{ base: '100%', sm: '50%' }}
          description="Введите ссылку на сайт (если есть)"
          error={fields.websiteUrl.errorText()}
          onChange={(e) => fields.websiteUrl.onChange(e.target.value)}
        />
      </Flex>
      <Textarea
        required
        disabled={loading}
        label="Описание проекта"
        value={fields.description.value}
        description="Введите описание проекта"
        error={fields.description.errorText()}
        onChange={(e) => fields.description.onChange(e.target.value)}
      />
      <MultiSelect
        clearable
        required
        searchable
        data={availableGroupedSkills}
        disabled={availableGroupedSkillsLoading || loading}
        label="Технологии используемые в проекте"
        value={fields.technologies.value}
        comboboxProps={{
          position: 'bottom',
          middlewares: { flip: false, shift: true },
          withinPortal: false,
        }}
        description="Выберите технологии используемые в проекте"
        error={fields.technologies.errorText()}
        hidePickedOptions
        nothingFoundMessage="Ничего не найдено"
        onChange={(e) => fields.technologies.onChange(e)}
        rightSection={availableGroupedSkillsLoading && <Loader size={16} />}
      />
    </Stack>
  )
}
