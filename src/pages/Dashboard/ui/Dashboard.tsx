import {
  Card,
  Center,
  Flex,
  Group,
  Paper,
  RingProgress,
  SegmentedControl,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import {
  IconCircleCheck,
  IconClock,
  IconClockX,
  IconMail,
} from '@tabler/icons-react'
import { useList, useUnit } from 'effector-react'

import { InvitationFilter } from '@/shared/api/types'
import { WithRoleCheck } from '@/shared/hoc'

import {
  $invitationsStats,
  $invitationsStatsFilter,
  $invitationsStatsLoading,
  redirectedToInvitations,
  statsFilterChanged,
} from '../model/model'
import classes from './styles.module.css'

const Dashboard = () => {
  return (
    <Stack className="shell_main">
      <InvitationStats />
    </Stack>
  )
}

// eslint-disable-next-line import/no-default-export
export default Dashboard

const icons = {
  all: IconMail,
  wait: IconClock,
  accept: IconCircleCheck,
  expired: IconClockX,
}

function InvitationStats() {
  const [loading, filter] = useUnit([
    $invitationsStatsLoading,
    $invitationsStatsFilter,
  ])
  const stats = useList($invitationsStats, (stat) => {
    const Icon = icons[stat.status]
    return (
      <Paper
        key={stat.label}
        onClick={() => redirectedToInvitations({ status: stat.status, filter })}
        withBorder
        radius="md"
        p="xs"
        className={classes.statCard}
      >
        <Group>
          <RingProgress
            size={80}
            roundCaps
            thickness={8}
            sections={[{ value: 100, color: stat.color }]}
            label={
              <Center>
                <Icon size={32} stroke={1.5} />
              </Center>
            }
          />

          <div>
            <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
              {stat.label}
            </Text>
            <Text fw={700} size="xl">
              {stat.stats}
            </Text>
          </div>
        </Group>
      </Paper>
    )
  })

  if (loading) {
    return (
      <Card radius="md" bg="var(--mantine-color-gray-1)">
        <Flex justify="space-between" align="center">
          <Skeleton height={28} width={200} radius="md" />
          <Skeleton height={36} width={250} radius="md" />
        </Flex>
        <SimpleGrid p="xl" pl={0} cols={{ base: 1, sm: 2 }}>
          {new Array(4).fill(0).map((_, index) => (
            <Paper
              key={index}
              withBorder
              radius="md"
              p="xs"
              className={classes.statCard}
            >
              <Group>
                <Skeleton height={80} circle width={80} />
                <div>
                  <Skeleton height={16} width="60%" mb={8} />
                  <Skeleton height={30} width="40%" />
                </div>
              </Group>
            </Paper>
          ))}
        </SimpleGrid>
      </Card>
    )
  }

  return (
    <WithRoleCheck allowedRoles={['ADMIN', 'UNIVERSITY_STAFF', 'STAFF']}>
      <Card radius="md" bg="var(--mantine-color-blue-filled)">
        <Flex justify="space-between" align="center">
          <Title c="white" order={3} fw={700}>
            Статистика приглашений
          </Title>
          <WithRoleCheck allowedRoles={['ADMIN']}>
            <SegmentedControl
              size="md"
              data={[
                { label: 'Созданные мной', value: 'createdByMe' },
                { label: 'Все', value: 'all' },
              ]}
              color="dark"
              value={filter}
              onChange={(value) =>
                statsFilterChanged(value as InvitationFilter)
              }
            />
          </WithRoleCheck>
        </Flex>
        <SimpleGrid p="xl" pl={0} cols={{ base: 1, sm: 2 }}>
          {stats}
        </SimpleGrid>
      </Card>
    </WithRoleCheck>
  )
}
