import { Stack, Title } from '@mantine/core'

import { Filters, Search } from '@/features/Invitations'
import { InvitationsTable } from '@/widgets'

const Invitations = () => {
  return (
    <Stack className="shell_main">
      <Title order={2} mb="md">
        Приглашения
      </Title>

      <Filters />
      <Search />
      <InvitationsTable />
    </Stack>
  )
}

// eslint-disable-next-line import/no-default-export
export default Invitations
