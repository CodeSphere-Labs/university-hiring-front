import {
  Badge,
  Button,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useList } from 'effector-react';

import { $groups } from './model';

import classes from './styles.module.css';

const Groups = () => {
  const groups = useList($groups, {
    getKey: (group) => group.id,
    fn: (group) => {
      return (
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
    }
  });
  return (
    <Stack className='shell_main'>
      <Title mb={16} order={2}>
        Группы
      </Title>
      <TextInput
        label='Поиск'
        description='Поиск по названию группы'
        placeholder='Поиск'
        rightSection={<IconSearch size={16} />}
      />
      <SimpleGrid spacing='md' verticalSpacing='md' cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}>
        {groups}
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
