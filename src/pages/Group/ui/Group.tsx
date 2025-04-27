import { Badge, Group as MantineGroup, Stack, TextInput, Title } from '@mantine/core';
import { IconCalendar, IconSearch, IconUsers } from '@tabler/icons-react';
import { useUnit } from 'effector-react';

import { $group, $initialGroupLoading } from '@/pages/Group/model/model';
import { formatDate, getStudentWord } from '@/shared/utils';

import { $search, searchChanged } from '../model/search';
import { StudentsTable } from './StudentsTable';

const GroupHeader = () => {
  const [group, loading] = useUnit([$group, $initialGroupLoading]);

  if (loading) return <div>loading...</div>;

  if (!group) return <div>Пусто</div>;

  return (
    <>
      <Title order={2}>Группа {group.data.name}</Title>
      <MantineGroup align='center' gap='xs'>
        <Badge size='lg' variant='light' color='blue' leftSection={<IconUsers size={14} />}>
          {group.meta.totalItems} {getStudentWord(group.meta.totalItems)}
        </Badge>
        <Badge size='lg' variant='light' color='gray' leftSection={<IconCalendar size={14} />}>
          {formatDate(group.data.createdAt)}
        </Badge>
      </MantineGroup>
    </>
  );
};

const Search = () => {
  const [search] = useUnit([$search]);

  return (
    <TextInput
      label='Поиск по имени или email'
      value={search}
      onChange={(e) => searchChanged(e.target.value)}
      placeholder='Алексей Петров Иванович'
      rightSection={<IconSearch size={14} />}
      rightSectionWidth={32}
    />
  );
};

const Group = () => {
  return (
    <Stack className='shell_main'>
      <GroupHeader />
      <Search />
      <StudentsTable />
    </Stack>
  );
};

export default Group;
