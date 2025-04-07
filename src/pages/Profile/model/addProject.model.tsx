import { modals } from '@mantine/modals';
import { createEffect, createEvent, sample } from 'effector';
import { createForm } from 'effector-forms';

import { validateRules } from '@/shared/config/validateRules';
import { showSuccess } from '@/shared/notifications/model';
import { $user } from '@/shared/session/model';

import { addProjectQuery } from '../api/api';
import { AddProjectModal } from '../ui/AddProjectModal/AddProjectModal';

import classes from '../ui/AddProjectModal/AddProjectModal.module.css';

export const projectModalOpened = createEvent();

export const $addProjectLoading = addProjectQuery.$pending.map((pending) => pending);

export const projectForm = createForm({
  fields: {
    name: {
      init: '',
      rules: [validateRules.required()]
    },
    githubUrl: {
      init: '',
      rules: [validateRules.required(), validateRules.gitHubRepoLink()]
    },
    description: {
      init: '',
      rules: [validateRules.required()]
    },
    websiteUrl: {
      init: ''
    },
    technologies: {
      init: [] as string[],
      rules: [validateRules.requiredArray()]
    }
  },
  validateOn: ['submit']
});

const projectModalConfirmFx = createEffect(() => {
  projectForm.submit();
});

const openModalFx = createEffect(() =>
  modals.openConfirmModal({
    title: 'Добавить проект',
    children: <AddProjectModal />,
    labels: { confirm: 'Добавить', cancel: 'Отменить' },
    onConfirm: () => projectModalConfirmFx(),
    closeOnConfirm: false,
    size: 'lg',
    zIndex: 1002,
    classNames: {
      inner: classes.modalInner
    }
  })
);

const projectModalCloseFx = createEffect<string, void, Error>((id) => {
  modals.close(id);
});

sample({
  clock: projectModalOpened,
  target: [projectForm.reset, openModalFx]
});

sample({
  clock: projectForm.formValidated,
  target: addProjectQuery.start
});

sample({
  clock: addProjectQuery.finished.success,
  source: openModalFx.doneData,
  target: [
    projectModalCloseFx,
    showSuccess({
      title: 'Проект добавлен',
      message: 'Проект успешно добавлен'
    })
  ]
});

$user.on(addProjectQuery.finished.success, (_, { result }) => result);
