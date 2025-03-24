import { modals } from '@mantine/modals'
import { createEffect, createEvent, createStore, sample } from 'effector'
import { createForm } from 'effector-forms'

import { RenewInvite } from '@/features/ActionCards/InviteUser/RenewInvite'
import { Group, Organization, Role } from '@/shared/api/types'
import { validateRules } from '@/shared/config/validateRules'
import {
  showError,
  showSuccessNotificationFx,
} from '@/shared/notifications/model'

import {
  createGroupQuery,
  createInvitation,
  createOrganizationQuery,
  getGroupsQuery,
  getOrganizationsQuery,
  refreshInvitation,
} from '../api/api'
import { InviteUser } from './InviteUser'
import classes from './styles.module.css'

export const modalOpened = createEvent()

export const $organizations = createStore<Organization[]>([])
export const $organizationsLoading = getOrganizationsQuery.$pending.map(
  (pending) => pending,
)
$organizations.on(
  getOrganizationsQuery.finished.success,
  (_, { result }) => result,
)

export const $groups = createStore<Group[]>([])
export const $groupsLoading = getGroupsQuery.$pending.map((pending) => pending)
$groups.on(getGroupsQuery.finished.success, (_, { result }) => result)

export const $refreshInvitationLoading = refreshInvitation.$pending.map(
  (pending) => pending,
)

export const form = createForm({
  fields: {
    organization: {
      init: null as Organization | null,
      rules: [validateRules.requiredObject()],
    },
    email: {
      init: '',
      rules: [validateRules.required(), validateRules.email()],
    },
    role: {
      init: '',
      rules: [validateRules.required()],
    },
    group: {
      init: null as Group | null,
      rules: [validateRules.requiredGroup()],
    },
  },
  validateOn: ['submit'],
})

const modalConfirmFx = createEffect(() => {
  form.submit()
})

const modalCloseFx = createEffect<string, void, Error>((id) => {
  modals.close(id)
})

const modalRenewInviteClosedFx = createEffect<string, void, Error>((id) => {
  modals.close(id)
})

const modalRenewInviteConfirmed = createEvent()
const modalRenewInviteCanceled = createEvent()

const openModalFx = createEffect(() =>
  modals.openConfirmModal({
    title: 'Пригласить пользователя',
    children: <InviteUser />,
    labels: { confirm: 'Пригласить', cancel: 'Отменить' },
    onConfirm: () => modalConfirmFx(),
    closeOnConfirm: false,
    size: 'lg',
    zIndex: 1002,
    classNames: {
      inner: classes.modalInner,
    },
  }),
)

const openRenewInviteModalFx = createEffect(() =>
  modals.openConfirmModal({
    title: 'Подтвердите действие',
    children: <RenewInvite />,
    labels: { confirm: 'Обновить', cancel: 'Назад' },
    onConfirm: () => modalRenewInviteConfirmed(),
    onCancel: () => modalRenewInviteCanceled(),
    closeOnConfirm: false,
    size: 'lg',
    zIndex: 1002,
    classNames: {
      inner: classes.modalInner,
    },
  }),
)
sample({
  clock: modalOpened,
  target: [form.reset, openModalFx],
})

sample({
  clock: modalOpened,
  filter: $organizations.map((organizations) => organizations.length === 0),
  target: [getOrganizationsQuery.start, getGroupsQuery.start],
})

sample({
  clock: createOrganizationQuery.finished.success,
  source: $organizations,
  fn: (organizations, { result }) => [...organizations, result],
  target: $organizations,
})

sample({
  clock: createOrganizationQuery.finished.success,
  fn: ({ result }) => ({
    organization: result,
  }),
  target: form.setForm,
})

sample({
  clock: createGroupQuery.finished.success,
  source: $groups,
  fn: (groups, { result }) => [...groups, result],
  target: $groups,
})

sample({
  clock: createGroupQuery.finished.success,
  fn: ({ result }) => ({
    group: result,
  }),
  target: form.setForm,
})

sample({
  clock: form.formValidated,
  fn: ({ organization, role, email, group }) => ({
    organizationId: organization!.id,
    groupId: group ? Number(group.id) : undefined,
    email,
    role: role as Role,
  }),
  target: createInvitation.start,
})

sample({
  clock: createInvitation.finished.success,
  source: openModalFx.doneData,
  target: [
    modalCloseFx,
    showSuccessNotificationFx.prepend(() => ({
      title: 'Приглашение создано',
      message: 'Приглашение успешно создано и отправлено',
    })),
  ],
})

sample({
  clock: createInvitation.finished.failure,
  filter: ({ error }) =>
    error.statusCode !== 403 && error.data?.message !== 'invintation_expired',
  target: showError('Ошибка при создании приглашения'),
})

sample({
  clock: createInvitation.finished.failure,
  filter: ({ error }) => error.data?.message === 'invintation_expired',
  target: openRenewInviteModalFx,
})

sample({
  clock: modalRenewInviteCanceled,
  source: openRenewInviteModalFx.doneData,
  target: modalRenewInviteClosedFx,
})

sample({
  clock: modalRenewInviteConfirmed,
  source: form.$values,
  fn: ({ organization, role, email, group }) => ({
    organizationId: organization!.id,
    groupId: group ? Number(group.id) : undefined,
    email,
    role: role as Role,
  }),
  target: refreshInvitation.start,
})

sample({
  clock: refreshInvitation.finished.success,
  source: openRenewInviteModalFx.doneData,
  target: modalRenewInviteClosedFx,
})

sample({
  clock: refreshInvitation.finished.success,
  source: openModalFx.doneData,
  target: modalCloseFx,
})

sample({
  clock: refreshInvitation.finished.success,
  target: showSuccessNotificationFx.prepend(() => ({
    title: 'Приглашение обновлено',
    message: 'Приглашение успешно обновлено и отправлено',
  })),
})

sample({
  clock: refreshInvitation.finished.failure,
  target: showError('Ошибка при обновлении приглашения'),
})
