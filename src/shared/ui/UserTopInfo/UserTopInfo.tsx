import { Avatar, Badge, Group, Text } from '@mantine/core';
import { IconAt, IconBrandGithub, IconBrandTelegram, IconBrandVk } from '@tabler/icons-react';
import { useUnit } from 'effector-react';

import type { User } from '@/shared/api/types';

import { routes } from '@/shared/routing';
import { getRole } from '@/shared/utils';

import { OrganizationInfo } from '../OrganizationInfo/OrganizationInfo';

import classes from './styles.module.css';

export const UserTopInfo = ({ user }: { user: User }) => {
  const userRole = getRole(user.role);
  const isUserProfileInfo = useUnit(routes.usersProfile.$isOpened);

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

      {isUserProfileInfo && <OrganizationInfo user={user} />}
    </Group>
  );
};
