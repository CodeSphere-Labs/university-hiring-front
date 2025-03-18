import { modals } from '@mantine/modals'
import { createEffect, createEvent, sample } from 'effector'
import { createForm } from 'effector-forms'

import { validateRules } from '@/shared/config/validateRules'
import {
  showError,
  showSuccessNotificationFx,
} from '@/shared/notifications/model'

import { createGroupQuery } from '../api/api'
import { CreateGroup } from './CreateGroup'

export const modalOpened = createEvent()
export const $loading = createGroupQuery.$pending.map((pending) => pending)

export const form = createForm({
  fields: {
    name: {
      init: '',
      rules: [validateRules.required()],
    },
  },
  validateOn: ['submit'],
})

export const modalConfirmFx = createEffect(() => {
  form.submit()
})

const openModalFx = createEffect(() =>
  modals.openConfirmModal({
    title: 'Создать группу',
    children: <CreateGroup />,
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
  target: createGroupQuery.start,
})

sample({
  clock: createGroupQuery.finished.success,
  source: openModalFx.doneData,
  target: [
    modalCloseFx,
    showSuccessNotificationFx.prepend(() => ({
      title: 'Группа создана',
      message: 'Группа успешно создана',
    })),
  ],
})

sample({
  clock: createGroupQuery.finished.failure,
  filter: ({ error }) => error.statusCode !== 403,
  target: showError('Ошибка при создании группы'),
})
