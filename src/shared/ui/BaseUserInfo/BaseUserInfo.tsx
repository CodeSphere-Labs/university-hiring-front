import { Badge, Grid, Group, Stack, Textarea, TextInput, Title } from '@mantine/core';

import type { User } from '@/shared/api/types';

import classes from './styles.module.css';

export const BaseUserInfo = ({ user }: { user: User }) => (
  <Stack mb={20}>
    <Title mb={15} order={3}>
      Основная информация
    </Title>
    <Grid
      gutter='md'
      type='media'
      breakpoints={{
        xs: '300px',
        sm: '400px',
        md: '600px',
        lg: '1100px',
        xl: '1200px'
      }}
    >
      <Grid.Col span={{ base: 12, sm: 12, md: 4, lg: 3 }}>
        <Stack>
          <TextInput
            disabled
            className={classes.input}
            label='Имя'
            radius='md'
            value={user.firstName}
            variant='filled'
          />
          <TextInput
            disabled
            className={classes.input}
            label='Отчество'
            radius='md'
            value={user.patronymic}
            variant='filled'
          />
          <TextInput
            disabled
            className={classes.input}
            label='Email'
            radius='md'
            value={user.email}
            variant='filled'
          />
        </Stack>
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 12, md: 8, lg: 9 }}>
        <Textarea
          disabled
          className={classes.input}
          label='О себе'
          radius='md'
          value={user.aboutMe || 'Информация не указана'}
          variant='filled'
          minRows={3}
        />
      </Grid.Col>
    </Grid>

    <Title mb={10} order={3}>
      Навыки
    </Title>
    <Group gap='xs' wrap='wrap'>
      {user.studentProfile?.skills.map((skill) => (
        <Badge key={skill} size='lg' variant='filled'>
          {skill}
        </Badge>
      ))}
    </Group>
  </Stack>
);
