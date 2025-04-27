import {
  Badge,
  Card,
  Center,
  Grid,
  Group,
  Loader,
  Paper,
  Skeleton,
  Stack,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { IconCalendar, IconSearch } from '@tabler/icons-react';
import { Link } from 'atomic-router-react';
import { useList, useUnit } from 'effector-react';
import { useEffect, useRef } from 'react';

import { routes } from '@/shared/routing';
import { formatDate } from '@/shared/utils';

import {
  $opportunities,
  $opportunitiesLoading,
  $opportunitiesMoreLoading,
  endOfOpportunitiesReached
} from '../model/model';
import { $search, searchChanged } from '../model/search';

import styles from './styles.module.css';

const Search = () => {
  const search = useUnit($search);

  return (
    <TextInput
      label='Поиск'
      value={search}
      onChange={(e) => searchChanged(e.target.value)}
      placeholder='Java разработчик'
      rightSection={<IconSearch size={16} />}
    />
  );
};

const SkeletonLoader = () => {
  return Array.from({ length: 10 }, (_, index) => (
    <Grid.Col key={index} span={6}>
      <Card h={270} withBorder>
        <Stack h='100%' justify='space-between'>
          <Stack>
            <Skeleton height={30} width='80%' />
            <Group justify='space-between'>
              <Skeleton height={20} width={150} />
              <Skeleton height={30} width={120} />
            </Group>
            <Skeleton height={60} width='100%' />
          </Stack>
          <Stack>
            <Group gap='xs' wrap='wrap'>
              <Skeleton height={25} width={80} />
              <Skeleton height={25} width={80} />
              <Skeleton height={25} width={80} />
            </Group>
            <Skeleton height={20} width={100} />
          </Stack>
        </Stack>
      </Card>
    </Grid.Col>
  ));
};

const ResultsLoader = () => {
  const loading = useUnit($opportunitiesMoreLoading);
  if (loading) {
    return (
      <Center>
        <Loader variant='dots' />
      </Center>
    );
  }
  return null;
};

const List = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: null,
    threshold: 1,
    rootMargin: '100px'
  });

  const loading = useUnit($opportunitiesLoading);

  const opportunities = useList($opportunities, (opportunity) => (
    <Grid.Col span={6}>
      <Card
        className={styles.card}
        h={240}
        params={{ id: opportunity.id }}
        component={Link}
        // atomic-router types are not correct for mantine Link component
        // eslint-disable-next-line ts/ban-ts-comment
        // @ts-expect-error
        to={routes.internshipDashboardCard}
        withBorder
      >
        <Stack h='100%' justify='space-between'>
          <Stack>
            <Card.Section component={Title} order={3}>
              {opportunity.title}
            </Card.Section>

            <Group justify='space-between'>
              <Text>{opportunity.organization.name}</Text>
              <Badge
                size='lg'
                variant='light'
                color='gray'
                leftSection={<IconCalendar size={14} />}
              >
                {formatDate(opportunity.createdAt)}
              </Badge>
            </Group>

            <Text fw={500} lineClamp={2} style={{ flexGrow: 1 }}>
              {opportunity.description}
            </Text>
          </Stack>

          <Stack>
            <Group gap='xs' wrap='wrap'>
              {opportunity.requiredSkills.map((skill) => (
                <Badge key={skill.id} size='md' variant='light'>
                  {skill.name}
                </Badge>
              ))}
            </Group>

            <Group>
              <Text size='sm'>
                Откликов: <Badge size='sm'>{opportunity.respondedUserIds.length}</Badge>
              </Text>
            </Group>
          </Stack>
        </Stack>
      </Card>
    </Grid.Col>
  ));

  useEffect(() => {
    if (entry?.isIntersecting) {
      endOfOpportunitiesReached();
    }
  }, [entry?.isIntersecting]);

  return (
    <>
      <Grid ref={containerRef}>{loading ? <SkeletonLoader /> : opportunities}</Grid>

      <ResultsLoader />

      <Paper ref={ref} p='xl'></Paper>
    </>
  );
};

const InternshipDashboard = () => {
  return (
    <Stack className='shell_main'>
      <Title mb={16} order={2}>
        Ваши вакансии
      </Title>
      <Search />
      <List />
    </Stack>
  );
};

export default InternshipDashboard;
