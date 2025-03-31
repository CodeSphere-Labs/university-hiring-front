import { Badge, Group as MantineGroup, Stack, Title } from '@mantine/core';
import { IconCalendar, IconUsers } from '@tabler/icons-react';
import { useUnit } from 'effector-react';

import { $group, $loading } from '@/pages/Group/model';
import { formatDate, getStudentWord } from '@/shared/utils';
import { StudentsTable } from './StudentsTable';

const Group = () => {
  const [group, loading] = useUnit([$group, $loading]);

  if (loading) return <div>loading...</div>;

  if (!group) return <div>Пусто</div>;

  return (
    <Stack>
      <Title order={2}>Группа {group.data.name}</Title>
      <MantineGroup align='center' gap='xs'>
        <Badge size='lg' variant='light' color='blue' leftSection={<IconUsers size={14} />}>
          {group.data.students.length} {getStudentWord(group.data.students.length)}
        </Badge>
        <Badge size='lg' variant='light' color='gray' leftSection={<IconCalendar size={14} />}>
          {formatDate(group.data.createdAt)}
        </Badge>
      </MantineGroup>
      <StudentsTable />
    </Stack>
  );
};

export default Group;
