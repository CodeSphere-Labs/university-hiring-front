import { Menu } from '@mantine/core'
import { IconRefresh, IconTrash } from '@tabler/icons-react'
import { useUnit } from 'effector-react'

import { $status } from '@/features/Invitations/Filters/model'
import { Invitation } from '@/shared/api/types'

import { deletedInvitation, refreshedInvitation } from './model'

export const DropdownMenu = ({
  record,
  children,
}: {
  record: Invitation
  children: React.ReactNode
}) => {
  const status = useUnit($status)

  const actions = [
    status === 'expired' && (
      <Menu.Item
        key="refresh"
        leftSection={<IconRefresh size={14} />}
        onClick={() => refreshedInvitation(record.id)}
      >
        Обновить приглашение
      </Menu.Item>
    ),
    <Menu.Item
      key="delete"
      leftSection={<IconTrash size={14} />}
      color="red"
      onClick={() => deletedInvitation(record.id)}
    >
      Удалить приглашение
    </Menu.Item>,
  ].filter(Boolean)

  return (
    <Menu position="bottom-start">
      <Menu.Target>
        <tr>{children}</tr>
      </Menu.Target>
      {actions.length > 0 && <Menu.Dropdown>{actions}</Menu.Dropdown>}
    </Menu>
  )
}
