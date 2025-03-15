import { Flex, Stack, Textarea, TextInput } from '@mantine/core'
import { useForm } from 'effector-forms'
import { useUnit } from 'effector-react'

import { $loading, form } from './model'

export const CreateOrganization = () => {
  const { fields } = useForm(form)
  const [loading] = useUnit([$loading])

  return (
    <Stack>
      <TextInput
        label="Название организации"
        description="Введите название организации"
        value={fields.name.value}
        onChange={(e) => fields.name.onChange(e.target.value)}
        error={fields.name.errorText()}
        required
        disabled={loading}
      />
      <Flex gap="md" wrap={{ base: 'wrap', sm: 'nowrap' }}>
        <TextInput
          label="Ссылка на сайт"
          description="Введите ссылку на сайт"
          w={{ base: '100%', sm: '50%' }}
          value={fields.websiteUrl.value}
          onChange={(e) => fields.websiteUrl.onChange(e.target.value)}
          error={fields.websiteUrl.errorText()}
          required
          disabled={loading}
        />
        <TextInput
          label="Почта организации"
          description="Введите почту организации"
          placeholder="example@mail.ru"
          w={{ base: '100%', sm: '50%' }}
          value={fields.email.value}
          onChange={(e) => fields.email.onChange(e.target.value)}
          error={fields.email.errorText()}
          required
          disabled={loading}
        />
      </Flex>
      <Textarea
        label="Описание организации"
        description="Введите описание организации"
        value={fields.about.value}
        onChange={(e) => fields.about.onChange(e.target.value)}
        error={fields.about.errorText()}
        required
        disabled={loading}
      />
    </Stack>
  )
}
