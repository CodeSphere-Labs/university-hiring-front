import { modals } from '@mantine/modals';
import { createEffect, createEvent, createStore, sample } from 'effector';

import type { Group, Organization, Role } from '@/shared/api/types';

import { RenewInvite } from '@/features/ActionCards/InviteUser/RenewInvite';
import { validateRules } from '@/shared/config/validateRules';
import { createModalAction } from '@/shared/factories/createModalAction';
import { showError, showSuccess } from '@/shared/notifications/model';

import {
  createGroupQuery,
  createInvitationQuery,
  createOrganizationQuery,
  getGroupsQuery,
  getOrganizationsQuery,
  refreshInvitationQuery
} from '../api/api';
import { InviteUser } from './InviteUser';

import classes from './styles.module.css';

export const $organizations = createStore<Organization[]>([]);
export const $organizationsLoading = getOrganizationsQuery.$pending.map((pending) => pending);
$organizations.on(getOrganizationsQuery.finished.success, (_, { result }) => result);

export const $groups = createStore<Group[]>([]);
export const $groupsLoading = getGroupsQuery.$pending.map((pending) => pending);
$groups.on(getGroupsQuery.finished.success, (_, { result }) => result);

export const $refreshInvitationLoading = refreshInvitationQuery.$pending.map((pending) => pending);

const modalRenewInviteConfirmed = createEvent();
const modalRenewInviteCanceled = createEvent();

export const { modalOpened, form, openModalFx, modalCloseFx } = createModalAction({
  Component: <InviteUser />,
  formConfig: {
    fields: {
      organization: {
        init: null as Organization | null,
        rules: [validateRules.requiredObject()]
      },
      email: {
        init: '',
        rules: [validateRules.required(), validateRules.email()]
      },
      role: {
        init: '',
        rules: [validateRules.required()]
      },
      group: {
        init: null as Group | null,
        rules: [validateRules.requiredGroup()]
      }
    },
    validateOn: ['submit']
  },
  labels: {
    cancel: 'Отменить',
    confirm: 'Пригласить'
  },
  openTargets: [getOrganizationsQuery.start, getGroupsQuery.start],
  transformValues: ({ organization, role, email, group }) => ({
    organizationId: organization!.id,
    groupId: group ? Number(group.id) : undefined,
    email,
    role: role as Role
  }),
  submitTarget: createInvitationQuery,
  successNotification: {
    title: 'Приглашение отправлено',
    message: 'Приглашение успешно отправлено'
  },
  title: 'Пригласить пользователя',
  modalClassNames: {
    inner: classes.modalInner
  }
});

const modalRenewInviteClosedFx = createEffect<string, void, Error>((id) => {
  modals.close(id);
});

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
      inner: classes.modalInner
    }
  })
);

sample({
  clock: createOrganizationQuery.finished.success,
  source: $organizations,
  fn: (organizations, { result }) => [...organizations, result],
  target: $organizations
});

sample({
  clock: createOrganizationQuery.finished.success,
  fn: ({ result }) => ({
    organization: result
  }),
  target: form.setForm
});

sample({
  clock: createGroupQuery.finished.success,
  source: $groups,
  fn: (groups, { result }) => [...groups, result],
  target: $groups
});

sample({
  clock: createGroupQuery.finished.success,
  fn: ({ result }) => ({
    group: result
  }),
  target: form.setForm
});

sample({
  clock: createInvitationQuery.finished.failure,
  filter: ({ error }) => error.data?.message !== 'invintation_expired',
  target: showError('Ошибка при создании приглашения')
});

sample({
  clock: createInvitationQuery.finished.failure,
  filter: ({ error }) => error.data?.message === 'invintation_expired',
  target: openRenewInviteModalFx
});

sample({
  clock: modalRenewInviteCanceled,
  source: openRenewInviteModalFx.doneData,
  target: modalRenewInviteClosedFx
});

sample({
  clock: modalRenewInviteConfirmed,
  source: form.$values,
  fn: ({ organization, role, email, group }) => ({
    organizationId: organization!.id,
    groupId: group ? Number(group.id) : undefined,
    email,
    role: role as Role
  }),
  target: refreshInvitationQuery.start
});

sample({
  clock: refreshInvitationQuery.finished.success,
  source: openRenewInviteModalFx.doneData,
  target: modalRenewInviteClosedFx
});

sample({
  clock: refreshInvitationQuery.finished.success,
  source: openModalFx.doneData,
  target: modalCloseFx
});

sample({
  clock: refreshInvitationQuery.finished.success,
  target: showSuccess({
    title: 'Приглашение обновлено',
    message: 'Приглашение успешно обновлено и отправлено'
  })
});

sample({
  clock: refreshInvitationQuery.finished.failure,
  target: showError('Ошибка при обновлении приглашения')
});
