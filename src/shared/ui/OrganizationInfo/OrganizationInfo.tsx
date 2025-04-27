import { Avatar, Divider, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { IconMail, IconWorld } from '@tabler/icons-react';

import type { User } from '@/shared/api/types';

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
