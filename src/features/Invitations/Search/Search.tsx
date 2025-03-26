import { TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { useUnit } from 'effector-react'

import { $search, searchChanged } from './model'

export const InvitationsSearch = () => {
  const search = useUnit($search)

  return (
    <TextInput
      label="Поиск"
      value={search}
      description="Поиск по email"
      leftSection={<IconSearch size={16} />}
      leftSectionPointerEvents="none"
      onChange={(e) => searchChanged(e.target.value)}
      placeholder="Поиск"
    />
  )
}
