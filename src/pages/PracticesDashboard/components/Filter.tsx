import { Group, Paper, SegmentedControl, Stack, Text } from '@mantine/core';
import { useUnit } from 'effector-react';

import type { CreatedByFilter } from '@/shared/api/types';

import { withRoleCheck } from '@/shared/hoc';
import { $user } from '@/shared/session/model';

import { $filter, filterChanged } from '../model/filter.model';

const Info = () => {
  const [filter, user] = useUnit([$filter, $user]);

  const filtersData = [
    { label: 'Все', value: 'all' },
    { label: 'Созданные мной', value: 'createdByMe', role: 'UNIVERSITY_STAFF' },
    { label: 'Закрепленные за мной', value: 'assignedToMe', role: 'STAFF' }
  ].filter(({ role }) => !role || role === user?.role);

  return (
    <Paper bg='var(--mantine-color-blue-filled)' mb='md' p='md' radius='md' withBorder>
      <Stack>
        <Group justify='space-between'>
          <Text c='white' fw={500}>
            Фильтры
          </Text>
        </Group>

        <Group>
          <Text c='white' fw={500} size='sm'>
            Практики:
          </Text>
          <SegmentedControl
            data={filtersData}
            value={filter}
            color='dark'
            onChange={(value) => filterChanged(value as CreatedByFilter)}
          />
        </Group>
      </Stack>
    </Paper>
  );
};

export const Filter = withRoleCheck(Info, ['ADMIN', 'UNIVERSITY_STAFF', 'STAFF']);
