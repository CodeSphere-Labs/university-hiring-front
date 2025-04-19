import { Avatar, Badge, Card, Container, Group, Loader, Stack, Text, Title } from '@mantine/core';
import { IconCalendar, IconMapPin, IconNotes } from '@tabler/icons-react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { useUnit } from 'effector-react';

import { $practice, $practiceLoading } from './model';

import classes from './PracticeDashboardCard.module.css';

// Устанавливаем русскую локаль для dayjs
dayjs.locale('ru');

const PracticeDashboardCard = () => {
  const practice = useUnit($practice);
  const loading = useUnit($practiceLoading);

  if (loading) {
    return (
      <Container py='xl' size='lg'>
        <Group justify='center'>
          <Loader size='xl' />
        </Group>
      </Container>
    );
  }

  if (!practice) {
    return (
      <Container py='xl' size='lg'>
        <Text c='dimmed' size='lg' ta='center'>
          Практика не найдена
        </Text>
      </Container>
    );
  }

  return (
    <Stack className='shell_main'>
      <Card className={classes.card} radius='md'>
        <Stack gap='lg'>
          <Group align='flex-start' justify='space-between'>
            <Stack gap='xs'>
              <Title order={2}>{practice.name}</Title>
              <Group gap='xs'>
                <Badge size='lg' variant='light'>
                  {practice.organization.name}
                </Badge>
                <Badge size='lg' variant='light' color='blue'>
                  {practice.university.name}
                </Badge>
              </Group>
            </Stack>
            <Group gap='xs'>
              <IconCalendar size={20} stroke={1.5} />
              <Text c='dimmed' size='sm'>
                {dayjs(practice.startDate).format('D MMMM YYYY')} -{' '}
                {dayjs(practice.endDate).format('D MMMM YYYY')}
              </Text>
            </Group>
          </Group>

          <Group gap='xs'>
            <IconMapPin size={20} stroke={1.5} />
            <Text size='sm'>{practice.address}</Text>
          </Group>

          {practice.notes && (
            <Stack gap='xs'>
              <Group gap='xs'>
                <IconNotes size={20} stroke={1.5} />
                <Text fw={500}>Примечания:</Text>
              </Group>
              <Text size='sm'>{practice.notes}</Text>
            </Stack>
          )}

          <Stack gap='xs'>
            <Text fw={500}>Группа:</Text>
            <Text size='sm'>{practice.group.name}</Text>
          </Stack>

          <Stack gap='xs'>
            <Text fw={500}>Студенты:</Text>
            <Group gap='sm'>
              {practice.students.map((student) => (
                <Group key={student.id} gap='xs'>
                  <Avatar
                    alt={`${student.firstName} ${student.lastName}`}
                    radius='xl'
                    size='sm'
                    src={student.avatarUrl}
                  />
                  <Text size='sm'>
                    {student.firstName} {student.lastName}
                  </Text>
                </Group>
              ))}
            </Group>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
};

export default PracticeDashboardCard;
