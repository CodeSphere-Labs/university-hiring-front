import { Avatar, Badge, Card, Divider, Group, Stack, Tabs, Text, Title } from '@mantine/core';
import {
  IconCalendar,
  IconRosetteDiscountCheck,
  IconRosetteDiscountCheckOff,
  IconUsers
} from '@tabler/icons-react';
import { Link } from 'atomic-router-react';
import { useUnit } from 'effector-react';

import { routes } from '@/shared/routing';
import { formatDate } from '@/shared/utils';

import { $loading, $opportinity } from './model';

import styles from './InternshipDashboardCard.module.css';

const FilterTabs = () => {
  return (
    <Tabs defaultValue='all' variant='pills'>
      <Tabs.List>
        <Tabs.Tab value='all' leftSection={<IconUsers size={24} />}>
          Все
        </Tabs.Tab>
        <Tabs.Tab value='accepted' leftSection={<IconRosetteDiscountCheck size={24} />}>
          Одобренные
        </Tabs.Tab>
        <Tabs.Tab value='rejected' leftSection={<IconRosetteDiscountCheckOff size={24} />}>
          Отклоненные
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value='all'>
        <Text>Все отклики</Text>
      </Tabs.Panel>

      <Tabs.Panel value='accepted'>
        <Text>Одобренные отклики</Text>
      </Tabs.Panel>

      <Tabs.Panel value='rejected'>
        <Text>Отклоненные отклики</Text>
      </Tabs.Panel>
    </Tabs>
  );
};

const InternshipDashboardCard = () => {
  const [opportinity, loading] = useUnit([$opportinity, $loading]);

  if (loading || !opportinity) {
    return null;
  }

  return (
    <Stack gap='xl'>
      <Stack gap='md'>
        <Group align='flex-start' justify='space-between'>
          <Stack gap='xs'>
            <Title order={2}>{opportinity.title}</Title>
          </Stack>
          <Badge size='lg' variant='light' color='gray' leftSection={<IconCalendar size={14} />}>
            {formatDate(opportinity.createdAt)}
          </Badge>
        </Group>

        <Divider />

        <Stack gap='xs'>
          <Title order={4}>Описание</Title>
          <Text>{opportinity.description}</Text>
        </Stack>

        <Stack gap='xs'>
          <Title order={4}>Требуемые навыки</Title>
          <Group gap='xs'>
            {opportinity.requiredSkills.map((skill) => (
              <Badge key={skill.id} size='lg' variant='light'>
                {skill.name}
              </Badge>
            ))}
          </Group>
        </Stack>
      </Stack>

      <Stack gap='md'>
        <Group gap='xs'>
          <IconUsers size={20} />
          <Title order={3}>Отклики студентов</Title>
          <Badge size='lg' variant='light'>
            {opportinity.responses.length}
          </Badge>
        </Group>

        <FilterTabs />

        <Stack gap='md'>
          {opportinity.responses.map((response) => (
            <Card
              key={response.id}
              className={styles.card}
              params={{ id: response.student.id }}
              component={Link}
              // atomic-router types are not correct for mantine Link component
              // eslint-disable-next-line ts/ban-ts-comment
              // @ts-expect-error
              to={routes.profileInfo}
              withBorder
            >
              <Stack gap='md'>
                <Group>
                  <Avatar radius='xl' size='lg'>
                    {response.student.firstName[0]}
                    {response.student.lastName[0]}
                  </Avatar>
                  <Stack gap={0}>
                    <Text fw={500} size='lg'>
                      {response.student.firstName} {response.student.lastName}
                    </Text>
                    <Text c='dimmed' size='sm'>
                      {response.student.email}
                    </Text>
                  </Stack>
                </Group>

                {response.student.aboutMe && (
                  <Stack gap='xs'>
                    <Text fw={500}>О себе</Text>
                    <Text>{response.student.aboutMe}</Text>
                  </Stack>
                )}

                {response.coverLetter && (
                  <Stack gap='xs'>
                    <Text fw={500}>Сопроводительное письмо</Text>
                    <Text lineClamp={2}>{response.coverLetter}</Text>
                  </Stack>
                )}

                <Group gap='xs'>
                  {response.student.studentProfile.skills.map((skill) => (
                    <Badge key={skill} size='lg' variant='light'>
                      {skill}
                    </Badge>
                  ))}
                </Group>
              </Stack>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default InternshipDashboardCard;
