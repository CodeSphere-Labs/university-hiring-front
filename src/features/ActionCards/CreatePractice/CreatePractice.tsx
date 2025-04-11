import {
  Checkbox,
  Combobox,
  Flex,
  Group,
  Input,
  Loader,
  Pill,
  PillsInput,
  Select,
  Stack,
  Textarea,
  TextInput,
  useCombobox
} from '@mantine/core';
import { DatePickerInput, DatesProvider } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import { useForm } from 'effector-forms';
import { useUnit } from 'effector-react';
import { useState } from 'react';

import {
  $groups,
  $groupsLoading,
  $groupStudents,
  $groupStudentsLoading,
  $organizations,
  $organizationsLoading,
  $selectAll,
  form,
  selectAllChanged
} from './model';

import 'dayjs/locale/ru';

const MAX_DISPLAYED_VALUES = 3;

const StudentsMultiSelect = () => {
  const { fields } = useForm(form);
  const value = fields.studentIds.value;
  const onChange = fields.studentIds.onChange;
  const error = fields.studentIds.errorText();

  const [groupStudents, groupStudentsLoading, selectAll] = useUnit([
    $groupStudents,
    $groupStudentsLoading,
    $selectAll
  ]);

  const [search, setSearch] = useState('');

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active')
  });

  const handleSelectAll = (checked: boolean) => {
    selectAllChanged(checked);
    if (checked) {
      const allStudentIds = groupStudents.map((student) => student.id);
      onChange(allStudentIds);
    } else {
      onChange([]);
    }
  };

  const handleValueSelect = (val: string) => {
    const numVal = Number(val);
    const newValue = value.includes(numVal)
      ? value.filter((v) => v !== numVal)
      : [...value, numVal];

    onChange(newValue);

    const allStudentsSelected =
      groupStudents.length > 0 && groupStudents.every((student) => newValue.includes(student.id));
    if (allStudentsSelected !== selectAll) {
      selectAllChanged(allStudentsSelected);
    }
  };

  const handleValueRemove = (val: number) => {
    const newValue = value.filter((v) => v !== val);
    onChange(newValue);

    const allStudentsSelected =
      groupStudents.length > 0 && groupStudents.every((student) => newValue.includes(student.id));
    if (allStudentsSelected !== selectAll) {
      selectAllChanged(allStudentsSelected);
    }
  };

  const values = value
    .slice(
      0,
      MAX_DISPLAYED_VALUES === value.length ? MAX_DISPLAYED_VALUES : MAX_DISPLAYED_VALUES - 1
    )
    .map((item) => {
      const student = groupStudents.find((s) => s.id === item);
      return (
        <Pill key={item} onRemove={() => handleValueRemove(item)} withRemoveButton>
          {student ? `${student.firstName} ${student.lastName} ${student.patronymic}` : item}
        </Pill>
      );
    });

  const shouldFilterOptions = search.trim() !== '';
  const filteredOptions = shouldFilterOptions
    ? groupStudents.filter((item) =>
        `${item.firstName} ${item.lastName} ${item.patronymic}`
          .toLowerCase()
          .includes(search.toLowerCase().trim())
      )
    : groupStudents;

  const options = filteredOptions.map((student) => (
    <Combobox.Option
      key={student.id}
      active={value.includes(student.id)}
      value={student.id.toString()}
    >
      <Group gap='sm'>
        <Checkbox
          aria-hidden
          checked={value.includes(student.id)}
          style={{ pointerEvents: 'none' }}
          tabIndex={-1}
          onChange={() => {}}
        />
        <span>
          {student.firstName} {student.lastName} {student.patronymic}
        </span>
      </Group>
    </Combobox.Option>
  ));

  return (
    <Combobox
      disabled={groupStudentsLoading}
      middlewares={{ flip: false, shift: true }}
      onOptionSubmit={handleValueSelect}
      position='bottom'
      store={combobox}
      withinPortal={false}
    >
      <Combobox.DropdownTarget>
        <PillsInput
          required
          label='Студенты'
          error={error}
          onClick={() => combobox.toggleDropdown()}
          pointer
          rightSection={groupStudentsLoading && <Loader size={16} />}
        >
          <Pill.Group>
            {value.length > 0 ? (
              <>
                {values}
                {value.length > MAX_DISPLAYED_VALUES && (
                  <Pill>+{value.length - (MAX_DISPLAYED_VALUES - 1)}</Pill>
                )}
              </>
            ) : (
              <Input.Placeholder>Выберите студентов</Input.Placeholder>
            )}

            <Combobox.EventsTarget>
              <PillsInput.Field
                type='hidden'
                onKeyDown={(event) => {
                  if (event.key === 'Backspace') {
                    event.preventDefault();
                    handleValueRemove(value[value.length - 1]);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        {options.length > 0 && (
          <Combobox.Header>
            <Checkbox
              checked={selectAll}
              label='Выбрать всех'
              p={5}
              onChange={(event) => handleSelectAll(event.currentTarget.checked)}
            />
          </Combobox.Header>
        )}

        <Combobox.Search
          size='md'
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          placeholder='Поиск студентов'
        />

        <Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
          {options.length > 0 ? (
            options
          ) : (
            <Combobox.Empty>
              {fields.groupId.value ? 'Ничего не найдено' : 'Выберите учебную группу'}
            </Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

const PracticeDatePicker = () => {
  const { fields } = useForm(form);

  return (
    <DatesProvider
      settings={{ locale: 'ru', firstDayOfWeek: 1, weekendDays: [0, 6], timezone: 'UTC' }}
    >
      <DatePickerInput
        required
        label='Даты проведения практики'
        type='range'
        value={[fields.startDate.value, fields.endDate.value]}
        dropdownType='popover'
        error={fields.startDate.errorText()}
        leftSection={<IconCalendar size={18} stroke={1.5} />}
        onChange={(values) => {
          fields.startDate.onChange(values[0]);
          fields.endDate.onChange(values[1]);
        }}
        placeholder='Выберите диапазон дат проведения практики'
        popoverProps={{ withinPortal: false }}
      />
    </DatesProvider>
  );
};

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
