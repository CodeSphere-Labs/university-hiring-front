import { Loader, LoadingOverlay, Stack, Text, Title } from '@mantine/core';
import { useUnit } from 'effector-react';

import { $refreshInvitationLoading } from './model';

export const RenewInvite = () => {
  const refreshInvitationLoading = useUnit($refreshInvitationLoading);
  return (
    <Stack>
      <LoadingOverlay visible={refreshInvitationLoading} loaderProps={{ children: <Loader /> }} />
      <Title order={3}>Приглашение уже существует</Title>
      <Text>Вы можете обновить приглашение, отправив новое приглашение на этот email.</Text>
    </Stack>
  );
};
