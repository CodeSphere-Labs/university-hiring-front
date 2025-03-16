import { modals } from '@mantine/modals'
import { createEffect, createEvent, createStore, sample } from 'effector'
import { createForm } from 'effector-forms'

import { Organization } from '@/shared/api/types'
import { validateRules } from '@/shared/config/validateRules'
import {
  createOrganizationQuery,
  getOrganizationsQuery,
} from '@/shared/session/api'

import { InviteUser } from './InviteUser'
import classes from './styles.module.css'

export const modalOpened = createEvent()
export const $organizations = createStore<Organization[]>([])
export const $organizationsLoading = getOrganizationsQuery.$pending.map(
  (pending) => pending,
)

sample({
  clock: createOrganizationQuery.finished.success,
  source: $organizations,
  fn: (organizations, { result }) => [...organizations, result],
  target: $organizations,
})

$organizations.on(
  getOrganizationsQuery.finished.success,
  (_, { result }) => result,
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
    about: {
      init: '',
      rules: [validateRules.required()],
    },
    websiteUrl: {
      init: '',
      rules: [validateRules.required(), validateRules.url()],
    },
    role: {
      init: '',
      rules: [validateRules.required()],
    },
  },
  validateOn: ['submit'],
})

const modalConfirmFx = createEffect(() => {
  form.submit()
})

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

sample({
  clock: modalOpened,
  target: [form.reset, openModalFx],
})

sample({
  clock: modalOpened,
  filter: $organizations.map((organizations) => organizations.length === 0),
  target: getOrganizationsQuery.start,
})

sample({
  clock: createOrganizationQuery.finished.success,
  fn: ({ result }) => ({
    organization: result,
  }),
  target: form.setForm,
})
