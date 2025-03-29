import {
  Badge,
  Button,
  Card,
  Group,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useList, useUnit } from 'effector-react';

import type { Group as GroupType } from '@/shared/api/types';

import { $groups, $loading, $search, searchChanged } from './model';

import classes from './styles.module.css';

const SKELETON_COUNT = 10;

const SkeletonCard = () => (
  <Card className={classes.card} p='sm' radius='md' withBorder>
    <Card.Section className={classes.section} mt='sm'>
      <Skeleton height={24} radius='sm' width='80%' />
    </Card.Section>

    <Card.Section className={classes.section}>
      <Skeleton height={20} mt='md' radius='sm' width='40%' />
    </Card.Section>

    <Group mt='xs'>
      <Skeleton height={36} radius='md' width='100%' />
    </Group>
  </Card>
);

const GroupCard = ({ group }: { group: GroupType }) => (
  <Card className={classes.card} p='sm' radius='md' withBorder>
    <Card.Section className={classes.section} mt='sm'>
      <Text fw={500} fz='lg'>
        {group.name}
      </Text>
    </Card.Section>

    <Card.Section className={classes.section}>
      <Badge className={classes.label} mt='md' variant='dot' color='blue'>
        {group.students.length} {getStudentWord(group.students.length)}
      </Badge>
    </Card.Section>

    <Group mt='xs'>
      <Button radius='md' style={{ flex: 1 }}>
        Перейти к группе
      </Button>
    </Group>
  </Card>
);

const Groups = () => {
  const [search, loading] = useUnit([$search, $loading]);

  const groups = useList($groups, {
    getKey: (group) => group.id,
    fn: (group) => <GroupCard group={group} />
  });

  const skeletons = Array.from({ length: SKELETON_COUNT }, (_, i) => <SkeletonCard key={i} />);

  return (
    <Stack className='shell_main'>
      <Title mb={16} order={2}>
        Группы
      </Title>
      <TextInput
        label='Поиск'
        value={search}
        description='Поиск по названию группы'
        onChange={(e) => searchChanged(e.target.value)}
        placeholder='Поиск'
        rightSection={<IconSearch size={16} />}
      />
      <SimpleGrid spacing='md' verticalSpacing='md' cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}>
        {loading ? skeletons : groups}
      </SimpleGrid>
    </Stack>
  );
};

export default Groups;

function getStudentWord(count: number): string {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return 'студентов';
  }

  if (lastDigit === 1) {
    return 'студент';
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'студента';
  }

  return 'студентов';
}
