import { Stack, TextInput } from '@mantine/core';
import { useForm } from 'effector-forms';
import { useUnit } from 'effector-react';

import { $loading, form } from './model';

export const CreateGroup = () => {
  const [loading] = useUnit([$loading]);
  const { fields } = useForm(form);

  return (
    <Stack>
      <TextInput
        required
        disabled={loading}
        label='Название группы'
        value={fields.name.value}
        description='Название учебной группы'
        error={fields.name.errorText()}
        onChange={(e) => fields.name.onChange(e.target.value)}
        placeholder='Введите название группы'
      />
    </Stack>
  );
};
