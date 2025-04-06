import { Stack, Title } from '@mantine/core';

import { InvitationsFilters, InvitationsSearch } from '@/features/Invitations';
import { InvitationsTable } from '@/widgets';

const Invitations = () => {
  return (
    <Stack className='shell_main'>
      <Title mb='md' order={2}>
        Приглашения
      </Title>

      <InvitationsFilters />
      <InvitationsSearch />
      <InvitationsTable />
    </Stack>
  );
};

export default Invitations;
