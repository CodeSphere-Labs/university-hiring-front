import { Avatar, Badge, Card, Divider, Group, Stack, Text, Title } from '@mantine/core';
import { IconCalendar, IconUsers } from '@tabler/icons-react';
import { Link } from 'atomic-router-react';
import { useUnit } from 'effector-react';

import { routes } from '@/shared/routing';
import { formatDate } from '@/shared/utils';

import { $loading, $opportinity } from './model';

import styles from './InternshipDashboardCard.module.css';

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
            <Text fw={500} size='lg'>
              {opportinity.organization.name}
            </Text>
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

                {response.coverLetter && (
                  <Stack gap='xs'>
                    <Text fw={500}>Сопроводительное письмо</Text>
                    <Text>{response.coverLetter}</Text>
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
