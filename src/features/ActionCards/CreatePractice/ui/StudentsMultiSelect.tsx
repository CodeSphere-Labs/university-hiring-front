import {
  Checkbox,
  Combobox,
  Group,
  Input,
  Loader,
  Pill,
  PillsInput,
  useCombobox
} from '@mantine/core';
import { useForm } from 'effector-forms';
import { useUnit } from 'effector-react';
import { useState } from 'react';

import {
  $groupStudents,
  $groupStudentsLoading,
  $selectAll,
  form,
  selectAllChanged
} from '../model';

import 'dayjs/locale/ru';

const MAX_DISPLAYED_VALUES = 3;

export const StudentsMultiSelect = () => {
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
