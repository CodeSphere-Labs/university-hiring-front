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
import { Link } from 'atomic-router-react';
import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import { useUnit } from 'effector-react';

import { routes } from '@/shared/routing';

import { Chat } from '../chat/Chat';
import { $practice, $practiceLoading } from '../model/model';

import classes from './styles.module.css';

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
      <Grid.Col span={{ base: 12, md: 7 }} order={{ base: 1, md: 1 }}>
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
                  <Group
                    key={student.id}
                    gap='xs'
                    // atomic-router types are not correct for mantine Link component
                    // eslint-disable-next-line ts/ban-ts-comment
                    // @ts-expect-error
                    params={{ id: String(student.id) }}
                    component={Link}
                    to={routes.usersProfile}
                  >
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
      <Grid.Col h={{ base: 600, md: '100%' }} span={{ base: 12, md: 5 }} order={{ base: 2, md: 2 }}>
        <Chat />
      </Grid.Col>
    </Grid>
  );
};

export default PracticeDashboardCard;
