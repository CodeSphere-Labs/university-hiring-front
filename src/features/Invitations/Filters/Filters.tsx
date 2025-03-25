import { Group, Paper, SegmentedControl, Stack, Text } from '@mantine/core'
import { useUnit } from 'effector-react'

import { InvitationFilter, InvitationStatus } from '@/shared/api/types'
import { WithRoleCheck } from '@/shared/hoc'

import { $filter, $status, filterChanged, statusChanged } from './model'

export const Filters = () => {
  const [filter, status] = useUnit([$filter, $status])

  return (
    <Paper
      radius="md"
      p="md"
      withBorder
      mb="md"
      bg="var(--mantine-color-blue-filled)"
    >
      <Stack>
        <Group justify="space-between">
          <Text c="white" fw={500}>
            Фильтры
          </Text>
        </Group>

        <WithRoleCheck allowedRoles={['ADMIN']}>
          <Group>
            <Text size="sm" fw={500} c="white">
              Источник:
            </Text>
            <SegmentedControl
              color="dark"
              value={filter}
              onChange={(value) => filterChanged(value as InvitationFilter)}
              data={[
                { label: 'Мои приглашения', value: 'createdByMe' },
                { label: 'Все приглашения', value: 'all' },
              ]}
            />
          </Group>
        </WithRoleCheck>

        <Group>
          <Text size="sm" fw={500} c="white">
            Статус:
          </Text>
          <SegmentedControl
            value={status}
            color="dark"
            onChange={(value) => statusChanged(value as InvitationStatus)}
            data={[
              { label: 'Все', value: 'all' },
              { label: 'Ожидающие', value: 'wait' },
              { label: 'Принятые', value: 'accept' },
              { label: 'Истекшие', value: 'expired' },
            ]}
          />
        </Group>
      </Stack>
    </Paper>
  )
}
