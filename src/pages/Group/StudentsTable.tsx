import type { DataTableColumn } from 'mantine-datatable';

import { Avatar, Badge, Group, Text } from '@mantine/core';

import { useUnit } from 'effector-react';
import { DataTable } from 'mantine-datatable';

import type { Student } from '@/shared/api/types';
import { getRole } from '@/shared/utils';

import {
  $group,
  $groupLoading,
  $page,
  $recordsPerPage,
  pageChanged,
  recordsPerPageChanged
} from './model';

import classes from './styles.module.css';

export const StudentsTable = () => {
  const [group, loading, page, recordsPerPage] = useUnit([
    $group,
    $groupLoading,
    $page,
    $recordsPerPage
  ]);

  const columns: DataTableColumn<Student>[] = [
    {
      accessor: 'avatarUrl',
      title: '',
      width: 50,
      render: (student) => (
        <Avatar radius='xl' size='md' src={student.avatarUrl}>
          {student.firstName[0]}
          {student.lastName[0]}
        </Avatar>
      )
    },
    {
      accessor: 'firstName',
      title: 'Имя',
      render: (student) => (
        <Text fw={500}>
          {student.firstName} {student.lastName} {student.patronymic}
        </Text>
      )
    },
    {
      accessor: 'email',
      title: 'Email',
      render: (student) => <Text>{student.email}</Text>
    },
    {
      accessor: 'role',
      title: 'Роль',
      render: (student) => {
        const roleInfo = getRole(student.role);
        return <Badge color={roleInfo.color}>{roleInfo.label}</Badge>;
      }
    },
    {
      accessor: 'studentProfile.skills',
      width: 350,
      title: 'Навыки',
      render: (student) => (
        <Group gap={4}>
          {student.studentProfile.skills.map((skill) => (
            <Badge key={skill} size='sm' variant='light'>
              {skill}
            </Badge>
          ))}
        </Group>
      )
    },
    {
      accessor: 'aboutMe',
      title: 'О себе',
      render: (student) => student.aboutMe || <Text c='dimmed'>Не указано</Text>
    }
  ];

  return (
    <DataTable
      striped
      className={classes.table}
      borderRadius='sm'
      minHeight={180}
      columns={columns}
      highlightOnHover
      noRecordsText='В группе нет студентов'
      records={group?.data.students || []}
      withTableBorder
      fetching={loading}
      page={page}
      onPageChange={pageChanged}
      onRecordsPerPageChange={recordsPerPageChanged}
      paginationActiveBackgroundColor='grape'
      paginationText={({ from, to, totalRecords }) => `${from}-${to} из ${totalRecords}`}
      recordsPerPage={recordsPerPage}
      loadingText='Загрузка данных...'
      recordsPerPageLabel='Количество'
      recordsPerPageOptions={[10, 20, 50]}
      totalRecords={group?.meta.totalItems || 0}
    />
  );
};
