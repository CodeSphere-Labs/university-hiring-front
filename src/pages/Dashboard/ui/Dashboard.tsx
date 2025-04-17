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
  Title
} from '@mantine/core';
import { IconCircleCheck, IconClock, IconClockX, IconMail } from '@tabler/icons-react';
import { useList, useUnit } from 'effector-react';

import type { CreatedByFilter } from '@/shared/api/types';

import { ActionCards } from '@/features/ActionCards';
import { WithRoleCheck } from '@/shared/hoc';

import {
  $invitationsStats,
  $invitationsStatsFilter,
  $invitationsStatsLoading,
  redirectedToInvitations,
  statsFilterChanged
} from '../model/model';

import classes from './styles.module.css';

const icons = {
  all: IconMail,
  wait: IconClock,
  accept: IconCircleCheck,
  expired: IconClockX
};

const InvitationStats = () => {
  const [loading, filter] = useUnit([$invitationsStatsLoading, $invitationsStatsFilter]);
  const stats = useList($invitationsStats, (stat) => {
    const Icon = icons[stat.status];
    return (
      <Paper
        key={stat.label}
        className={classes.statCard}
        p='xs'
        radius='md'
        onClick={() => redirectedToInvitations({ status: stat.status, filter })}
        withBorder
      >
        <Group>
          <RingProgress
            label={
              <Center>
                <Icon size={32} stroke={1.5} />
              </Center>
            }
            size={80}
            thickness={8}
            roundCaps
            sections={[{ value: 100, color: stat.color }]}
          />

          <div>
            <Text c='dimmed' fw={700} size='xs' tt='uppercase'>
              {stat.label}
            </Text>
            <Text fw={700} size='xl'>
              {stat.stats}
            </Text>
          </div>
        </Group>
      </Paper>
    );
  });

  if (loading) {
    return (
      <Card bg='var(--mantine-color-gray-1)' radius='md'>
        <Flex align='center' justify='space-between'>
          <Skeleton height={28} radius='md' width={200} />
          <Skeleton height={36} radius='md' width={250} />
        </Flex>
        <SimpleGrid p='xl' pl={0} cols={{ base: 1, sm: 2 }}>
          {Array.from({ length: 4 })
            .fill(0)
            .map((_, index) => (
              <Paper key={index} className={classes.statCard} p='xs' radius='md' withBorder>
                <Group>
                  <Skeleton circle height={80} width={80} />
                  <div>
                    <Skeleton height={16} mb={8} width='60%' />
                    <Skeleton height={30} width='40%' />
                  </div>
                </Group>
              </Paper>
            ))}
        </SimpleGrid>
      </Card>
    );
  }

  return (
    <WithRoleCheck allowedRoles={['ADMIN', 'UNIVERSITY_STAFF', 'STAFF']}>
      <Card bg='var(--mantine-color-blue-filled)' radius='md'>
        <Flex align='center' justify='space-between'>
          <Title c='white' fw={700} order={3}>
            Статистика приглашений
          </Title>
          <WithRoleCheck allowedRoles={['ADMIN']}>
            <SegmentedControl
              data={[
                { label: 'Созданные мной', value: 'createdByMe' },
                { label: 'Все', value: 'all' }
              ]}
              size='md'
              value={filter}
              color='dark'
              onChange={(value) => statsFilterChanged(value as CreatedByFilter)}
            />
          </WithRoleCheck>
        </Flex>
        <SimpleGrid p='xl' pl={0} cols={{ base: 1, sm: 2 }}>
          {stats}
        </SimpleGrid>
      </Card>
    </WithRoleCheck>
  );
};

const Dashboard = () => {
  return (
    <Stack className='shell_main'>
      <Title mb={16} order={2}>
        Панель управления
      </Title>
      <ActionCards />
      <InvitationStats />
    </Stack>
  );
};

export default Dashboard;
