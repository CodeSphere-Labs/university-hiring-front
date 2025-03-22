import {
  Badge,
  Flex,
  Group,
  Paper,
  SegmentedControl,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons-react'
import dayjs from 'dayjs'
import { useUnit } from 'effector-react'
import { DataTable, DataTableColumn } from 'mantine-datatable'

import {
  Invitation,
  InvitationFilter,
  InvitationStatus,
} from '@/shared/api/types'
import { WithRoleCheck } from '@/shared/hoc'
import { $user } from '@/shared/session/model'
import { getRole } from '@/shared/utils/role'

import {
  $filter,
  $invitations,
  $loading,
  $page,
  $recordsPerPage,
  $status,
  filterChanged,
  pageChanged,
  recordsPerPageChanged,
  statusChanged,
} from './model'
import classes from './styles.module.css'

const Invitations = () => {
  const [invitations, loading, page, recordsPerPage, filter, status, user] =
    useUnit([
      $invitations,
      $loading,
      $page,
      $recordsPerPage,
      $filter,
      $status,
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
    <Stack className="shell_main">
      <Title order={2} mb="md">
        Приглашения
      </Title>

      <Paper
        radius="md"
        p="md"
        withBorder
        mb="md"
        bg="var(--mantine-color-blue-filled)"
      >
        <Stack>
          <Group justify="space-between">
            <Text c="white" fw={500}>
              Фильтры
            </Text>
          </Group>

          <WithRoleCheck allowedRoles={['ADMIN']}>
            <Group>
              <Text size="sm" fw={500} c="white">
                Источник:
              </Text>
              <SegmentedControl
                color="dark"
                value={filter}
                onChange={(value) => filterChanged(value as InvitationFilter)}
                data={[
                  { label: 'Мои приглашения', value: 'createdByMe' },
                  { label: 'Все приглашения', value: 'all' },
                ]}
              />
            </Group>
          </WithRoleCheck>

          <Group>
            <Text size="sm" fw={500} c="white">
              Статус:
            </Text>
            <SegmentedControl
              value={status}
              color="dark"
              onChange={(value) => statusChanged(value as InvitationStatus)}
              data={[
                { label: 'Все', value: 'all' },
                { label: 'Ожидающие', value: 'wait' },
                { label: 'Принятые', value: 'accept' },
                { label: 'Истекшие', value: 'expired' },
              ]}
            />
          </Group>
        </Stack>
      </Paper>

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
        paginationText={({ from, to, totalRecords }) =>
          `${from}-${to} из ${totalRecords}`
        }
        className={classes.table}
      />
    </Stack>
  )
}

const formatDate = (dateString: string) => {
  return dayjs(dateString).format('DD.MM.YYYY HH:mm')
}

// eslint-disable-next-line import/no-default-export
export default Invitations
