import { createEvent, createStore, sample } from 'effector';

import type { Group, Organization, OrganizationType, Student, User } from '@/shared/api/types';

import {
  createPracticeQuery,
  getGroupStudentsQuery,
  getOrganizationsQuery,
  getOrganizationUsersQuery
} from '@/features/ActionCards/api/api';
import { getGroupsQuery } from '@/pages/Groups/api/api';
import { validateRules } from '@/shared/config/validateRules';
import { createModalAction } from '@/shared/factories/createModalAction';

import { CreatePractice } from './CreatePractice';

import classes from './CreatePractice.module.css';

const ORGANIZATION: OrganizationType = 'company';

export const selectAllChanged = createEvent<boolean>();

export const $selectAll = createStore<boolean>(false);
$selectAll.on(selectAllChanged, (_, value) => value);

export const $groups = createStore<Group[]>([]);
$groups.on(getGroupsQuery.finished.success, (_, { result }) => result);

export const $organizations = createStore<Organization[]>([]);
$organizations.on(getOrganizationsQuery.finished.success, (_, { result }) => result);

export const $groupStudents = createStore<Student[]>([]);
$groupStudents.on(getGroupStudentsQuery.finished.success, (_, { result }) => result);

export const $organizationUsers = createStore<User[]>([]);
$organizationUsers.on(getOrganizationUsersQuery.finished.success, (_, { result }) => result);

export const $groupsLoading = getGroupsQuery.$pending.map((pending) => pending);
export const $organizationsLoading = getOrganizationsQuery.$pending.map((pending) => pending);
export const $groupStudentsLoading = getGroupStudentsQuery.$pending.map((pending) => pending);
export const $organizationUsersLoading = getOrganizationUsersQuery.$pending.map(
  (pending) => pending
);

export const { modalOpened, form } = createModalAction({
  Component: <CreatePractice />,
  errorNotification: 'Ошибка при создании практики',
  formConfig: {
    fields: {
      name: {
        init: '',
        rules: [validateRules.required()]
      },
      groupId: {
        init: '',
        rules: [validateRules.required()]
      },
      organizationId: {
        init: '',
        rules: [validateRules.required()]
      },
      supervisorId: {
        init: '',
        rules: [validateRules.required()]
      },
      studentIds: {
        init: [] as number[],
        rules: [validateRules.requiredArray()]
      },
      address: {
        init: '',
        rules: [validateRules.required()]
      },
      notes: {
        init: '',
        rules: []
      },
      startDate: {
        init: null as Date | null,
        rules: [validateRules.required()]
      },
      endDate: {
        init: null as Date | null,
        rules: [validateRules.required()]
      }
    },
    validateOn: ['submit']
  },
  labels: {
    cancel: 'Назад',
    confirm: 'Создать'
  },
  transformValues: ({ ...fields }) => ({
    ...fields,
    startDate: fields.startDate as Date,
    endDate: fields.endDate as Date,
    groupId: Number(fields.groupId),
    organizationId: Number(fields.organizationId),
    supervisorId: Number(fields.supervisorId)
  }),
  submitTarget: createPracticeQuery,
  openTargets: [getGroupsQuery.start],
  successNotification: {
    title: 'Практика создана',
    message: 'Практика успешно создана'
  },
  title: 'Создать практику',
  modalClassNames: {
    inner: classes.modalInner
  }
});

sample({
  clock: modalOpened,
  fn: () => ({ type: ORGANIZATION }),
  target: getOrganizationsQuery.start
});

sample({
  clock: [form.fields.groupId.$value, form.fields.organizationId.$value],
  target: [getGroupStudentsQuery.start, getOrganizationUsersQuery.start]
});

sample({
  clock: [getGroupStudentsQuery.finished.success, getOrganizationUsersQuery.finished.success],
  target: [form.fields.studentIds.resetValue, form.fields.supervisorId.resetValue]
});
