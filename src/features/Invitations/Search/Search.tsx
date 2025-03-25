import { TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { useUnit } from 'effector-react'

import { $search, searchChanged } from './model'

export const InvitationsSearch = () => {
  const search = useUnit($search)

  return (
    <TextInput
      leftSectionPointerEvents="none"
      leftSection={<IconSearch size={16} />}
      label="Поиск"
      placeholder="Поиск"
      description="Поиск по email"
      value={search}
      onChange={(e) => searchChanged(e.target.value)}
    />
  )
}
