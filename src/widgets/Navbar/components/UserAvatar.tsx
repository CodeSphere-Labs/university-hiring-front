import { Avatar, Skeleton } from '@mantine/core';
import { useUnit } from 'effector-react';

import { $sessionPending, $user } from '@/shared/session/model';

export const UserAvatar = () => {
  const user = useUnit($user);
  const pending = useUnit($sessionPending);

  if (pending) {
    return <Skeleton circle height={40} />;
  }

  if (!user) return null;

  return (
    <Avatar alt={`${user.firstName} ${user.lastName}`} radius='xl' size='md' src={user.avatarUrl} />
  );
};
