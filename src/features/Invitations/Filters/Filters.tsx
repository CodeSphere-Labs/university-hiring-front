import { Group, Paper, SegmentedControl, Stack, Text } from '@mantine/core';
import { useUnit } from 'effector-react';

import type { CreatedByFilter, InvitationStatus } from '@/shared/api/types';

import { WithRoleCheck } from '@/shared/hoc';

import { $filter, $status, filterChanged, statusChanged } from './model';

export const InvitationsFilters = () => {
  const [filter, status] = useUnit([$filter, $status]);

  return (
    <Paper bg='var(--mantine-color-blue-filled)' mb='md' p='md' radius='md' withBorder>
      <Stack>
        <Group justify='space-between'>
          <Text c='white' fw={500}>
            Фильтры
          </Text>
        </Group>

        <WithRoleCheck allowedRoles={['ADMIN']}>
          <Group>
            <Text c='white' fw={500} size='sm'>
              Источник:
            </Text>
            <SegmentedControl
              data={[
                { label: 'Мои приглашения', value: 'createdByMe' },
                { label: 'Все приглашения', value: 'all' }
              ]}
              value={filter}
              color='dark'
              onChange={(value) => filterChanged(value as CreatedByFilter)}
            />
          </Group>
        </WithRoleCheck>

        <Group>
          <Text c='white' fw={500} size='sm'>
            Статус:
          </Text>
          <SegmentedControl
            data={[
              { label: 'Все', value: 'all' },
              { label: 'Ожидающие', value: 'wait' },
              { label: 'Принятые', value: 'accept' },
              { label: 'Истекшие', value: 'expired' }
            ]}
            value={status}
            color='dark'
            onChange={(value) => statusChanged(value as InvitationStatus)}
          />
        </Group>
      </Stack>
    </Paper>
  );
};
