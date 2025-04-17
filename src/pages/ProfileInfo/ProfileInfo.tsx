import {
  Avatar,
  Badge,
  Divider,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title
} from '@mantine/core';
import {
  IconAt,
  IconBrandGithub,
  IconBrandTelegram,
  IconBrandVk,
  IconMail,
  IconWorld
} from '@tabler/icons-react';
import { useUnit } from 'effector-react';

import type { User } from '@/shared/api/types';

import { Projects } from '@/shared/ui/Projects/Projects';
import { getRole } from '@/shared/utils';

import { $user } from './model';

import classes from './UserInfoIcons.module.css';

export const OrganizationInfo = ({ user }: { user: User }) => {
  return (
    <Paper p='xl' radius='md' withBorder>
      <Stack gap='md'>
        <Group>
          <Avatar radius='md' size='xl' src={user.organization?.logoUrl}>
            {user.organization?.name[0]}
          </Avatar>
          <Stack gap={5}>
            <Title order={3}>{user.organization?.name}</Title>
            <Text c='dimmed' size='sm'>
              {user.organization?.about}
            </Text>
          </Stack>
        </Group>

        <Divider />

        <Group gap='lg'>
          {user.organization?.email && (
            <Group gap='xs'>
              <IconMail size={20} style={{ color: 'var(--mantine-color-gray-5)' }} />
              <Text>{user.organization.email}</Text>
            </Group>
          )}
          {user.organization?.websiteUrl && (
            <Group gap='xs'>
              <IconWorld size={20} style={{ color: 'var(--mantine-color-gray-5)' }} />
              <Text href={user.organization.websiteUrl} target='_blank' component='a'>
                {user.organization.websiteUrl}
              </Text>
            </Group>
          )}
        </Group>
      </Stack>
    </Paper>
  );
};

const UserTopInfo = () => {
  const user = useUnit($user);
  if (!user) return null;

  const userRole = getRole(user.role);

  return (
    <Group justify='space-between' wrap='wrap'>
      <Group wrap='wrap'>
        <Avatar
          alt={`${user.firstName} ${user.lastName}`}
          radius='md'
          size={134}
          src={user.avatarUrl}
        />
        <div>
          <Badge size='lg' variant='filled' color={userRole.color}>
            {userRole.label}
          </Badge>

          <Text className={classes.name} fw={500} fz='lg'>
            {user.firstName} {user.lastName}
          </Text>
          <Group
            // eslint-disable-next-line ts/ban-ts-comment
            // @ts-expect-error
            href={`mailto:${user.email}`}
            gap={10}
            mt={3}
            wrap='nowrap'
            component='a'
          >
            <IconAt className={classes.icon} size={24} stroke={1.5} />
            <Text c='dimmed' fz='sm'>
              Написать письмо
            </Text>
          </Group>
          {user.telegramLink && (
            <Group
              // eslint-disable-next-line ts/ban-ts-comment
              // @ts-expect-error
              href={user.telegramLink}
              gap={10}
              mt={3}
              target='_blank'
              wrap='nowrap'
              component='a'
            >
              <IconBrandTelegram className={classes.icon} size={24} stroke={1.5} />
              <Text c='dimmed' fz='sm'>
                Перейти в telegram
              </Text>
            </Group>
          )}
          {user.vkLink && (
            <Group
              // eslint-disable-next-line ts/ban-ts-comment
              // @ts-expect-error
              href={user.vkLink}
              gap={10}
              mt={3}
              target='_blank'
              wrap='nowrap'
              component='a'
            >
              <IconBrandVk className={classes.icon} size={24} stroke={1.5} />
              <Text c='dimmed' fz='sm'>
                Перейти в vk
              </Text>
            </Group>
          )}
          {user.studentProfile?.githubLink && (
            <Group
              // eslint-disable-next-line ts/ban-ts-comment
              // @ts-expect-error
              href={user.studentProfile.githubLink}
              gap={10}
              mt={3}
              target='_blank'
              wrap='nowrap'
              component='a'
            >
              <IconBrandGithub className={classes.icon} size={24} stroke={1.5} />
              <Text c='dimmed' fz='sm'>
                Перейти в github
              </Text>
            </Group>
          )}
        </div>
      </Group>

      <OrganizationInfo user={user} />
    </Group>
  );
};

const BaseUserInfo = () => {
  const user = useUnit($user);

  if (!user) return null;

  return (
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
};

const ProfileInfoContent = () => {
  const user = useUnit($user);

  if (!user) return null;

  return (
    <Stack className='shell_main'>
      <UserTopInfo />
      <BaseUserInfo />
      <Projects projects={user?.studentProfile?.projects || []} />
    </Stack>
  );
};

const ProfileInfo = () => {
  const user = useUnit($user);

  if (!user) return null;

  return <ProfileInfoContent />;
};

export default ProfileInfo;
