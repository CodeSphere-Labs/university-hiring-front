import { Badge, Flex, Text, Tooltip } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons-react'
import dayjs from 'dayjs'
import { useUnit } from 'effector-react'
import { DataTable, DataTableColumn } from 'mantine-datatable'

import { DropdownMenu } from '@/features/Invitations/DropdorwnMenu/DropdownMenu'
import {
  $invitations,
  $loading,
  $page,
  $recordsPerPage,
  pageChanged,
  recordsPerPageChanged,
} from '@/pages/Invitations/model/model'
import { Invitation } from '@/shared/api/types'
import { $user } from '@/shared/session/model'
import { formatDate, getRole } from '@/shared/utils'

import classes from './styles.module.css'

export const InvitationsTable = () => {
  const [invitations, loading, page, recordsPerPage, user] = useUnit([
    $invitations,
    $loading,
    $page,
    $recordsPerPage,
    $user,
  ])

  const isAdmin = user?.role === 'ADMIN'

  const baseColumns: DataTableColumn<Invitation>[] = [
    {
      accessor: 'email',
      title: 'Email',
      render: (invitation) => <Text fw={500}>{invitation.email}</Text>,
    },
    {
      accessor: 'role',
      title: 'Роль',
      render: (invitation) => {
        const roleInfo = getRole(invitation.role)
        return <Badge color={roleInfo.color}>{roleInfo.label}</Badge>
      },
    },
    {
      accessor: 'organization.name',
      title: 'Организация',
      render: (invitation) => (
        <Text fw={500}>{invitation.organization.name}</Text>
      ),
    },
    {
      accessor: 'used',
      title: 'Использовано',
      textAlign: 'center',
      render: (invitation) => (
        <Flex align="center" justify="center">
          {invitation.used ? (
            <IconCheck size={18} color="green" />
          ) : (
            <IconX size={18} color="red" />
          )}
        </Flex>
      ),
    },
    {
      accessor: 'createdAt',
      title: 'Дата создания',
      render: (invitation) => formatDate(invitation.createdAt),
    },
    {
      accessor: 'updatedAt',
      title: 'Дата обновления',
      render: (invitation) => formatDate(invitation.updatedAt),
    },
    {
      accessor: 'expiresAt',
      title: 'Истекает',
      render: (invitation) => {
        const isExpired = dayjs(invitation.expiresAt).isBefore(dayjs())
        return (
          <Text c={isExpired ? 'red' : undefined}>
            {formatDate(invitation.expiresAt)}
          </Text>
        )
      },
    },
  ]

  const adminColumn: DataTableColumn<Invitation> = {
    accessor: 'createdBy',
    title: 'Создатель',
    render: (invitation) => (
      <Tooltip label={invitation.createdBy?.email || ''}>
        <Text>
          {invitation.createdBy?.firstName || ''}{' '}
          {invitation.createdBy?.lastName || ''}
        </Text>
      </Tooltip>
    ),
  }

  const columns = isAdmin
    ? [...baseColumns.slice(0, 3), adminColumn, ...baseColumns.slice(3)]
    : baseColumns

  return (
    <DataTable
      minHeight={180}
      fetching={loading}
      withTableBorder
      borderRadius="sm"
      striped
      highlightOnHover
      columns={columns}
      records={invitations.data}
      totalRecords={invitations.meta.totalItems}
      paginationActiveBackgroundColor="grape"
      recordsPerPage={recordsPerPage}
      page={page}
      onPageChange={pageChanged}
      recordsPerPageOptions={[10, 20, 50]}
      recordsPerPageLabel="Количество"
      onRecordsPerPageChange={recordsPerPageChanged}
      noRecordsText="Пусто"
      loadingText="Загрузка данных..."
      onRowClick={(record) => console.log(record)}
      paginationText={({ from, to, totalRecords }) =>
        `${from}-${to} из ${totalRecords}`
      }
      className={classes.table}
      rowFactory={({ record, children }) => (
        <DropdownMenu record={record}>{children}</DropdownMenu>
      )}
    />
  )
}
