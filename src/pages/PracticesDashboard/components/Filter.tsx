import { Group, Paper, SegmentedControl, Stack, Text } from '@mantine/core';
import { useUnit } from 'effector-react';

import type { CreatedByFilter } from '@/shared/api/types';

import { withRoleCheck, WithRoleCheck } from '@/shared/hoc';

import { $filter, filterChanged } from '../model/filter.model';

const Info = () => {
  const filter = useUnit($filter);

  return (
    <Paper bg='var(--mantine-color-blue-filled)' mb='md' p='md' radius='md' withBorder>
      <Stack>
        <Group justify='space-between'>
          <Text c='white' fw={500}>
            Фильтры
          </Text>
        </Group>

        <WithRoleCheck allowedRoles={['ADMIN', 'UNIVERSITY_STAFF']}>
          <Group>
            <Text c='white' fw={500} size='sm'>
              Источник:
            </Text>
            <SegmentedControl
              data={[
                { label: 'Все', value: 'all' },
                { label: 'Созданные мной', value: 'createdByMe' }
              ]}
              value={filter}
              color='dark'
              onChange={(value) => filterChanged(value as CreatedByFilter)}
            />
          </Group>
        </WithRoleCheck>
      </Stack>
    </Paper>
  );
};

export const Filter = withRoleCheck(Info, ['ADMIN', 'UNIVERSITY_STAFF']);
