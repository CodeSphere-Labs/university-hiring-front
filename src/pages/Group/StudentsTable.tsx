import type { DataTableColumn } from 'mantine-datatable';

import { Avatar, Badge, Group, Stack, Text, Tooltip } from '@mantine/core';
import {
  IconBrandGithub,
  IconBrandTelegram,
  IconBrandVk,
  IconFileText,
  IconLink
} from '@tabler/icons-react';
import { useUnit } from 'effector-react';
import { DataTable } from 'mantine-datatable';

import type { Student } from '@/shared/api/types';
import { getRole } from '@/shared/utils';

import { $group } from './model';

import classes from './styles.module.css';

export const StudentsTable = () => {
  const group = useUnit($group);

  if (!group) return null;

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
      accessor: 'studentProfile.projects',
      title: 'Проекты',
      render: (student) => (
        <Stack gap={4}>
          {student.studentProfile.projects?.map((project) => (
            <Group key={project.id} gap={4}>
              <IconLink size={14} />
              <a href={project.websiteUrl} rel='noopener noreferrer' target='_blank'>
                <Text size='sm'>{project.name}</Text>
              </a>
            </Group>
          ))}
          {!student.studentProfile.projects?.length && (
            <Text c='dimmed' size='sm'>
              Нет проектов
            </Text>
          )}
        </Stack>
      )
    },
    {
      accessor: 'studentProfile',
      title: 'Профиль',
      render: (student) => (
        <Group gap='xs'>
          {student.telegramLink && (
            <Tooltip label='Telegram'>
              <a href={student.telegramLink} rel='noopener noreferrer' target='_blank'>
                <IconBrandTelegram size={20} />
              </a>
            </Tooltip>
          )}
          {student.vkLink && (
            <Tooltip label='VK'>
              <a href={student.vkLink} rel='noopener noreferrer' target='_blank'>
                <IconBrandVk size={20} />
              </a>
            </Tooltip>
          )}
          {student.studentProfile.githubLink && (
            <Tooltip label='GitHub'>
              <a href={student.studentProfile.githubLink} rel='noopener noreferrer' target='_blank'>
                <IconBrandGithub size={20} />
              </a>
            </Tooltip>
          )}
          {student.studentProfile.resume && (
            <Tooltip label='Резюме'>
              <a href={student.studentProfile.resume} rel='noopener noreferrer' target='_blank'>
                <IconFileText size={20} />
              </a>
            </Tooltip>
          )}
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
      minHeight={180}
      borderRadius='sm'
      columns={columns}
      highlightOnHover
      noRecordsText='В группе нет студентов'
      records={group.students}
      withTableBorder
    />
  );
};
