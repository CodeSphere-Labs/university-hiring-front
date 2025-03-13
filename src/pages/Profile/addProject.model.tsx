import { modals } from '@mantine/modals'
import { createEffect, createEvent, sample } from 'effector'
import { createForm } from 'effector-forms'

import { validateRules } from '@/shared/config/validateRules'
import { showSuccessNotificationFx } from '@/shared/notifications/model'
import { $user } from '@/shared/session'
import { addProjectQuery } from '@/shared/session/api'

import { AddProjectModalForm } from './Profile'

export const projectModalOpened = createEvent()
const projectModalConfirmFx = createEffect(() => {
  projectForm.submit()
})

export const $addProjectLoading = addProjectQuery.$pending.map(
  (pending) => pending,
)

const openModalFx = createEffect(() =>
  modals.openConfirmModal({
    title: 'Добавить проект',
    children: <AddProjectModalForm />,
    labels: { confirm: 'Добавить', cancel: 'Отменить' },
    onConfirm: () => projectModalConfirmFx(),
    closeOnConfirm: false,
    size: 'lg',
    zIndex: 1002,
  }),
)
const projectModalCloseFx = createEffect(() => {
  modals.closeAll()
})

export const projectForm = createForm({
  fields: {
    name: {
      init: '',
      rules: [validateRules.required()],
    },
    githubUrl: {
      init: '',
      rules: [validateRules.required(), validateRules.gitHubRepoLink()],
    },
    description: {
      init: '',
      rules: [validateRules.required()],
    },
    websiteUrl: {
      init: '',
    },
    technologies: {
      init: [] as string[],
      rules: [validateRules.requiredArray()],
    },
  },
  validateOn: ['submit'],
})

sample({
  clock: projectModalOpened,
  target: openModalFx,
})

sample({
  clock: projectForm.formValidated,
  source: projectForm.$values,
  target: addProjectQuery.start,
})

sample({
  clock: addProjectQuery.finished.success,
  target: [
    projectModalCloseFx,
    showSuccessNotificationFx.prepend(() => ({
      title: 'Проект добавлен',
      message: 'Проект успешно добавлен',
    })),
  ],
})

$user.on(addProjectQuery.finished.success, (_, { result }) => result)
