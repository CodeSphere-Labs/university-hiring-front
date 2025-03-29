import { Loader, MultiSelect, Stack, Textarea, TextInput } from '@mantine/core';
import { useForm } from 'effector-forms';
import { useUnit } from 'effector-react';

import { $availableGroupedSkills, $availableGroupedSkillsLoading, $loading, form } from './model';

export const CreateVacancy = () => {
  const [availableGroupedSkills, availableGroupedSkillsLoading, loading] = useUnit([
    $availableGroupedSkills,
    $availableGroupedSkillsLoading,
    $loading
  ]);
  const { fields } = useForm(form);

  return (
    <Stack>
      <TextInput
        required
        disabled={loading}
        label='Название вакансии'
        value={fields.title.value}
        description='Введите название вакансии'
        error={fields.title.errorText()}
        onChange={(e) => fields.title.onChange(e.target.value)}
        placeholder='Frontend developer'
      />
      <Textarea
        required
        disabled={loading}
        label='Описание вакансии'
        value={fields.description.value}
        description='Введите описание вакансии'
        error={fields.description.errorText()}
        onChange={(e) => fields.description.onChange(e.target.value)}
        placeholder='Самая крутая вакансия в мире'
      />
      <MultiSelect
        clearable
        required
        searchable
        data={availableGroupedSkills}
        disabled={availableGroupedSkillsLoading || loading}
        label='Навыки, которые должен иметь кандидат'
        value={fields.skills.value}
        comboboxProps={{
          position: 'bottom',
          middlewares: { flip: false, shift: true },
          withinPortal: false
        }}
        description='Выберите навыки, которые должен иметь кандидат'
        error={fields.skills.errorText()}
        hidePickedOptions
        nothingFoundMessage='Ничего не найдено'
        onChange={(value) => fields.skills.onChange(value)}
        rightSection={availableGroupedSkillsLoading && <Loader size={16} />}
      />
    </Stack>
  );
};
