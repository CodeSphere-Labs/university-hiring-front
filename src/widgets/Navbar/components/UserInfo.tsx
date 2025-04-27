import { Badge, Skeleton, Stack, Text } from '@mantine/core';
import { useUnit } from 'effector-react';

import { $sessionPending, $user } from '@/shared/session/model';
import { getRole } from '@/shared/utils';

export const UserInfo = () => {
  const user = useUnit($user);
  const pending = useUnit($sessionPending);

  if (pending) {
    return (
      <Stack gap={0}>
        <Skeleton height={20} mb={4} width={150} />
        <Skeleton height={20} width={100} />
      </Stack>
    );
  }

  if (!user) return null;

  const userRole = getRole(user.role);

  return (
    <Stack gap={0}>
      <Text fw={700} size='md'>
        {user.firstName} {user.lastName}
      </Text>
      <Badge size='sm' variant='light' color={userRole.color}>
        {userRole.label}
      </Badge>
    </Stack>
  );
};
