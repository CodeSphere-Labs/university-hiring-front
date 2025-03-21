import {
  Card,
  Center,
  Group,
  Paper,
  RingProgress,
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

import {
  $invitationsStats,
  $invitationsStatsLoading,
} from '@/pages/Dashboard/model'

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
  const loading = useUnit($invitationsStatsLoading)
  const stats = useList($invitationsStats, (stat) => {
    const Icon = icons[stat.icon]
    return (
      <Paper
        key={stat.label}
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
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        {new Array(4).fill(0).map((_, index) => (
          <Paper key={index} withBorder radius="md" p="xs">
            <Group>
              <Skeleton height={80} circle width={80} />
              <div style={{ flex: 1 }}>
                <Skeleton height={16} width="60%" mb={8} />
                <Skeleton height={30} width="40%" />
              </div>
            </Group>
          </Paper>
        ))}
      </SimpleGrid>
    )
  }

  return (
    <Card radius="md" bg="var(--mantine-color-blue-filled)">
      <Title c="white" order={3} fw={700}>
        Статистика приглашений
      </Title>
      <SimpleGrid p="xl" pl={0} cols={{ base: 1, sm: 2 }}>
        {stats}
      </SimpleGrid>
    </Card>
  )
}
