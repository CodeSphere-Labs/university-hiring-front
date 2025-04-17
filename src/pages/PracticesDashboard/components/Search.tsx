import type { TextInputProps } from '@mantine/core';

import { TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useUnit } from 'effector-react';

import { $search, searchChanged } from '../model/search.model';

export const Search = (props: TextInputProps) => {
  const search = useUnit($search);

  return (
    <TextInput
      {...props}
      label='Поиск'
      value={search}
      description='Поиск по названию практики'
      leftSection={<IconSearch size={16} />}
      leftSectionPointerEvents='none'
      onChange={(e) => searchChanged(e.target.value)}
      placeholder='Поиск'
    />
  );
};
