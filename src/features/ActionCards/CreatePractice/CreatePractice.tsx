import { Flex, Loader, Select, Stack, Textarea, TextInput } from '@mantine/core';
import { useForm } from 'effector-forms';
import { useUnit } from 'effector-react';

import { $groups, $groupsLoading, $organizations, $organizationsLoading, form } from './model';
import { PracticeDatePicker, StudentsMultiSelect, SupervisiorSelect } from './ui';

export const CreatePractice = () => {
  const { fields } = useForm(form);
  const [groups, groupsLoading, organizations, organizationsLoading] = useUnit([
    $groups,
    $groupsLoading,
    $organizations,
    $organizationsLoading
  ]);

  const groupsData = groups.map((group) => ({
    label: group.name,
    value: group.id.toString()
  }));

  const organizationsData = organizations.map((organization) => ({
    label: organization.name,
    value: organization.id.toString()
  }));

  return (
    <Stack>
      <Flex gap='md' wrap={{ base: 'wrap', sm: 'nowrap' }}>
        <TextInput
          required
          label='Название практики'
          value={fields.name.value}
          w={{ base: '100%', sm: '50%' }}
          error={fields.name.errorText()}
          onChange={(e) => fields.name.onChange(e.target.value)}
          placeholder='Производственная практика'
        />
        <TextInput
          required
          label='Адрес проведения практики'
          value={fields.address.value}
          w={{ base: '100%', sm: '50%' }}
          error={fields.address.errorText()}
          onChange={(e) => fields.address.onChange(e.target.value)}
          placeholder='ул. Ленина, 1'
        />
      </Flex>
      <Select
        clearable
        required
        searchable
        data={organizationsData}
        disabled={organizationsLoading}
        label='Организация'
        value={fields.organizationId.value.toString()}
        comboboxProps={{
          position: 'bottom',
          middlewares: { flip: false, shift: true },
          withinPortal: false
        }}
        description='Выберите организацию к которой будет привязана практика'
        error={fields.organizationId.errorText()}
        onChange={(value) => fields.organizationId.onChange(value ?? '')}
        placeholder='Выберите организацию'
        rightSection={organizationsLoading && <Loader size={16} />}
      />
      <SupervisiorSelect />
      <Select
        clearable
        required
        searchable
        data={groupsData}
        disabled={groupsLoading}
        label='Группа'
        value={fields.groupId.value.toString()}
        comboboxProps={{
          position: 'bottom',
          middlewares: { flip: false, shift: true },
          withinPortal: false
        }}
        description='Выберите учебную группу к которой будет привязана практика'
        error={fields.groupId.errorText()}
        onChange={(value) => fields.groupId.onChange(value ?? '')}
        placeholder='Выберите учебную группу'
        rightSection={groupsLoading && <Loader size={16} />}
      />
      <StudentsMultiSelect />

      <Textarea
        label='Примечание'
        resize='vertical'
        value={fields.notes.value}
        description='Примечание к практике (необязательное поле)'
        onChange={(e) => fields.notes.onChange(e.target.value)}
        placeholder='Примечание если необходимо'
      />
      <PracticeDatePicker />
    </Stack>
  );
};
