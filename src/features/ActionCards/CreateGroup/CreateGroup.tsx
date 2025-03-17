import { Stack, TextInput } from '@mantine/core'
import { useForm } from 'effector-forms'
import { useUnit } from 'effector-react'

import { $loading, form } from './model'

export const CreateGroup = () => {
  const [loading] = useUnit([$loading])
  const { fields } = useForm(form)

  return (
    <Stack>
      <TextInput
        label="Название группы"
        placeholder="Введите название группы"
        description="Название учебной группы"
        required
        disabled={loading}
        error={fields.name.errorText()}
        value={fields.name.value}
        onChange={(e) => fields.name.onChange(e.target.value)}
      />
    </Stack>
  )
}
