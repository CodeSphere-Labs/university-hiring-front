import { Flex, Stack, Textarea, TextInput } from '@mantine/core';
import { useForm } from 'effector-forms';
import { useUnit } from 'effector-react';

import { $loading, form } from './model';

export const CreateOrganization = () => {
  const { fields } = useForm(form);
  const [loading] = useUnit([$loading]);

  return (
    <Stack>
      <TextInput
        required
        disabled={loading}
        label='Название организации'
        value={fields.name.value}
        description='Введите название организации'
        error={fields.name.errorText()}
        onChange={(e) => fields.name.onChange(e.target.value)}
      />
      <Flex gap='md' wrap={{ base: 'wrap', sm: 'nowrap' }}>
        <TextInput
          required
          disabled={loading}
          label='Ссылка на сайт'
          value={fields.websiteUrl.value}
          w={{ base: '100%', sm: '50%' }}
          description='Введите ссылку на сайт'
          error={fields.websiteUrl.errorText()}
          onChange={(e) => fields.websiteUrl.onChange(e.target.value)}
        />
        <TextInput
          required
          disabled={loading}
          label='Почта организации'
          value={fields.email.value}
          w={{ base: '100%', sm: '50%' }}
          description='Введите почту организации'
          error={fields.email.errorText()}
          onChange={(e) => fields.email.onChange(e.target.value)}
          placeholder='example@mail.ru'
        />
      </Flex>
      <Textarea
        required
        disabled={loading}
        label='Описание организации'
        value={fields.about.value}
        description='Введите описание организации'
        error={fields.about.errorText()}
        onChange={(e) => fields.about.onChange(e.target.value)}
      />
    </Stack>
  );
};
