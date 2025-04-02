import {
  Badge,
  Box,
  Button,
  Card,
  Center,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { IconCalendar, IconSearch } from '@tabler/icons-react';
import { useList, useUnit } from 'effector-react';
import { useEffect, useRef } from 'react';

import { formatDate } from '@/shared/utils';

import { $opportunities, $opportunitiesLoading, endOfOpportunitiesReached } from './model';
import { $search, searchChanged } from './search';

const Search = () => {
  const search = useUnit($search);

  return (
    <TextInput
      value={search}
      onChange={(e) => searchChanged(e.target.value)}
      label='Поиск'
      placeholder='Java разработчик'
      rightSection={<IconSearch size={16} />}
    />
  );
};

const ResultsLoader = () => {
  const loading = useUnit($opportunitiesLoading);
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

  const opportunities = useList($opportunities, (opportunity) => {
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
          <Text fw={500}>{opportunity.description}</Text>
        </Group>

        <Group gap='xs' wrap='wrap'>
          {opportunity.requiredSkills.map((skill) => (
            <Badge key={skill.id} size='md' variant='light'>
              {skill.name}
            </Badge>
          ))}
        </Group>

        <Group mb='md'>
          <Button mt='md' radius='md' color='blue'>
            Откликнуться
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
        {opportunities}

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
