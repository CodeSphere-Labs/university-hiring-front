import { modals } from '@mantine/modals';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { createForm } from 'effector-forms';

import type { Group, Organization, OrganizationType, Student } from '@/shared/api/types';

import {
  createPracticeQuery,
  getGroupStudentsQuery,
  getOrganizationsQuery
} from '@/features/ActionCards/api/api';
import { getGroupsQuery } from '@/pages/Groups/api';
import { validateRules } from '@/shared/config/validateRules';
import { showError, showSuccess } from '@/shared/notifications/model';

import { CreatePractice } from './CreatePractice';

import classes from './CreatePractice.module.css';

const ORGANIZATION: OrganizationType = 'company';

export const modalOpened = createEvent();
export const selectAllChanged = createEvent<boolean>();

export const $selectAll = createStore<boolean>(false);
$selectAll.on(selectAllChanged, (_, value) => value);

export const $groups = createStore<Group[]>([]);
$groups.on(getGroupsQuery.finished.success, (_, { result }) => result);

export const $organizations = createStore<Organization[]>([]);
$organizations.on(getOrganizationsQuery.finished.success, (_, { result }) => result);

export const $groupStudents = createStore<Student[]>([]);
$groupStudents.on(getGroupStudentsQuery.finished.success, (_, { result }) => result);

export const $groupsLoading = getGroupsQuery.$pending.map((pending) => pending);
export const $organizationsLoading = getOrganizationsQuery.$pending.map((pending) => pending);
export const $groupStudentsLoading = getGroupStudentsQuery.$pending.map((pending) => pending);

export const form = createForm({
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
});

export const modalConfirmFx = createEffect(() => {
  form.submit();
});

const modalCloseFx = createEffect<string, void, Error>((id) => {
  modals.close(id);
});

const openModalFx = createEffect(() =>
  modals.openConfirmModal({
    title: 'Создать практику',
    children: <CreatePractice />,
    labels: { confirm: 'Создать', cancel: 'Назад' },
    onConfirm: () => modalConfirmFx(),
    closeOnConfirm: false,
    size: 'lg',
    zIndex: 1002,
    classNames: {
      inner: classes.modalInner
    }
  })
);

sample({
  clock: modalOpened,
  target: [form.reset, openModalFx, getGroupsQuery.start]
});

sample({
  clock: modalOpened,
  fn: () => ({ type: ORGANIZATION }),
  target: getOrganizationsQuery.start
});

sample({
  clock: form.fields.groupId.$value,
  target: getGroupStudentsQuery.start
});

sample({
  clock: form.formValidated,
  fn: ({ ...fields }) => ({
    ...fields,
    startDate: fields.startDate as Date,
    endDate: fields.endDate as Date,
    groupId: Number(fields.groupId),
    organizationId: Number(fields.organizationId)
  }),
  target: createPracticeQuery.start
});

sample({
  clock: createPracticeQuery.finished.success,
  source: openModalFx.doneData,
  target: [
    modalCloseFx,
    showSuccess({
      title: 'Практика создана',
      message: 'Практика успешно создана'
    })
  ]
});

sample({
  clock: createPracticeQuery.finished.failure,
  target: [showError('Произошла ошибка при создании практики')]
});
