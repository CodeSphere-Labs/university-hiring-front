import {
  Badge,
  Button,
  Card,
  Center,
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
import { useList, useUnit } from 'effector-react';
import { useEffect, useRef } from 'react';

import { $user } from '@/shared/session/model';
import { formatDate } from '@/shared/utils';

import {
  $opportunities,
  $opportunitiesLoading,
  $opportunitiesMoreLoading,
  endOfOpportunitiesReached,
  respondToOpportunityClicked
} from './model';
import { $search, searchChanged } from './search';

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
    <Card key={index} withBorder>
      <Group justify='space-between' mb='xs' mt='md'>
        <Skeleton height={20} width={200} />
        <Skeleton height={30} width={150} />
      </Group>

      <Group justify='space-between' mb='md'>
        <Skeleton height={60} width='100%' />
      </Group>

      <Group gap='xs' mb='md' wrap='wrap'>
        <Skeleton height={25} width={80} />
        <Skeleton height={25} width={80} />
        <Skeleton height={25} width={80} />
      </Group>

      <Group mb='md'>
        <Skeleton height={36} width={120} />
      </Group>
    </Card>
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
  const user = useUnit($user);

  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: null,
    threshold: 1,
    rootMargin: '100px'
  });

  const loading = useUnit($opportunitiesLoading);

  const opportunities = useList($opportunities, (opportunity) => {
    const alreadyResponded = opportunity.respondedUserIds.includes(user?.id ?? 0);

    return (
      <Card withBorder>
        <Card.Section component={Title} order={3}>
          {opportunity.title}
        </Card.Section>

        <Group justify='space-between' mb='xs' mt='md'>
          <Text>{opportunity.organization.name}</Text>
          <Badge size='lg' variant='light' color='gray' leftSection={<IconCalendar size={14} />}>
            {formatDate(opportunity.createdAt)}
          </Badge>
        </Group>

        <Group justify='space-between' mb='md'>
          <Text fw={500} lineClamp={4}>
            {opportunity.description}
          </Text>
        </Group>

        <Group gap='xs' wrap='wrap'>
          {opportunity.requiredSkills.map((skill) => (
            <Badge key={skill.id} size='md' variant='light'>
              {skill.name}
            </Badge>
          ))}
        </Group>

        <Group mb='md'>
          <Button
            disabled={alreadyResponded}
            mt='md'
            radius='md'
            color='blue'
            onClick={() => respondToOpportunityClicked(opportunity.id)}
          >
            {alreadyResponded ? 'Вы уже откликнулись' : 'Откликнуться'}
          </Button>
        </Group>
      </Card>
    );
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      endOfOpportunitiesReached();
    }
  }, [entry?.isIntersecting]);

  return (
    <>
      <Stack ref={containerRef}>
        {loading ? <SkeletonLoader /> : opportunities}

        <ResultsLoader />

        <Paper ref={ref} p='xl'></Paper>
      </Stack>
    </>
  );
};

const Internship = () => {
  return (
    <Stack className='shell_main'>
      <Title mb={16} order={2}>
        Ваши возможности 🚀
      </Title>
      <Search />
      <List />
    </Stack>
  );
};

export default Internship;
