import { modals } from '@mantine/modals'
import { createEffect, createEvent, sample } from 'effector'
import { createForm } from 'effector-forms'

import { validateRules } from '@/shared/config/validateRules'
import {
  showError,
  showSuccessNotificationFx,
} from '@/shared/notifications/model'

import { createOrganizationQuery } from '../api/api'
import { CreateOrganization } from './CreateOrganization'

export const modalOpened = createEvent()
export const $loading = createOrganizationQuery.$pending.map(
  (pending) => pending,
)

export const form = createForm({
  fields: {
    name: {
      init: '',
      rules: [validateRules.required()],
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
  },
  validateOn: ['submit'],
})

export const modalConfirmFx = createEffect(() => {
  form.submit()
})

const openModalFx = createEffect(() =>
  modals.openConfirmModal({
    title: 'Создать организацию',
    children: <CreateOrganization />,
    labels: { confirm: 'Создать', cancel: 'Назад' },
    onConfirm: () => modalConfirmFx(),
    closeOnConfirm: false,
    size: 'lg',
    zIndex: 1002,
  }),
)

const modalCloseFx = createEffect<string, void, Error>((id) => {
  modals.close(id)
})

sample({
  clock: modalOpened,
  target: [form.reset, openModalFx],
})

sample({
  clock: form.formValidated,
  target: createOrganizationQuery.start,
})

sample({
  clock: createOrganizationQuery.finished.success,
  source: openModalFx.doneData,
  target: [
    modalCloseFx,
    showSuccessNotificationFx.prepend(() => ({
      title: 'Организация создана',
      message: 'Организация успешно создана',
    })),
  ],
})

sample({
  clock: createOrganizationQuery.finished.failure,
  filter: ({ error }) => error.statusCode !== 403,
  target: showError('Ошибка при создании организации'),
})
