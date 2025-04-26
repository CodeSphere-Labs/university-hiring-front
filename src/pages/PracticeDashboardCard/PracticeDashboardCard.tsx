import {
  Avatar,
  Badge,
  Card,
  Container,
  Grid,
  Group,
  Loader,
  Stack,
  Text,
  Title
} from '@mantine/core';
import { IconCalendar, IconMapPin, IconNotes, IconUserSquareRounded } from '@tabler/icons-react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { useUnit } from 'effector-react';

import { Chat } from './chat/Chat';
import { $practice, $practiceLoading } from './model';

import classes from './PracticeDashboardCard.module.css';

dayjs.locale('ru');

const PracticeDashboardCard = () => {
  const [practice, loading] = useUnit([$practice, $practiceLoading]);

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
    <Grid className={`shell_main ${classes.grid}`} gutter={0} h='100%'>
      <Grid.Col span={7}>
        <Card className={classes.card} h='100%' radius='md'>
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
            </Group>

            <Group gap='xs'>
              <IconMapPin size={20} stroke={1.5} />
              <Text size='sm'>{practice.address}</Text>
            </Group>

            <Group gap='xs'>
              <IconCalendar size={20} stroke={1.5} />
              <Text size='sm'>
                {dayjs(practice.startDate).format('D MMMM YYYY')} -{' '}
                {dayjs(practice.endDate).format('D MMMM YYYY')}
              </Text>
            </Group>

            <Group gap='xs'>
              <IconUserSquareRounded size={20} stroke={1.5} />
              <Text size='sm'>
                {practice.supervisor.firstName} {practice.supervisor.lastName}
              </Text>
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
      </Grid.Col>
      <Grid.Col span={5}>
        <Chat />
      </Grid.Col>
    </Grid>
  );
};

export default PracticeDashboardCard;
