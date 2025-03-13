import { modals } from '@mantine/modals'
import { createEffect, createEvent, sample } from 'effector'
import { createForm } from 'effector-forms'

import { validateRules } from '@/shared/config/validateRules'
import { $user } from '@/shared/session'
import { addProjectQuery } from '@/shared/session/api'

import { AddProjectModalForm } from './Profile'

export const projectModalOpened = createEvent()
const projectModalConfirmFx = createEffect(() => {
  projectForm.submit()
})

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
  clock: projectModalConfirmFx,
  source: projectForm.$values,
  target: addProjectQuery.start,
})

$user.on(addProjectQuery.finished.success, (_, { result }) => result)
