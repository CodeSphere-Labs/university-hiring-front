import { modals } from '@mantine/modals';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { createForm } from 'effector-forms';

import type { GroupedSkill } from '@/shared/api/types';

import { createVacancyQuery } from '@/features/ActionCards/api/api';
import { getAvailableGroupedSkillsQuery } from '@/pages/Profile/api/api';
import { validateRules } from '@/shared/config/validateRules';
import { showError, showSuccessNotificationFx } from '@/shared/notifications/model';

import { CreateVacancy } from './CreateVacancy';

import classes from './CreateVacancy.module.css';

export const modalOpened = createEvent();

export const $loading = createVacancyQuery.$pending.map((pending) => pending);
export const $availableGroupedSkills = createStore<GroupedSkill[]>([]);
export const $availableGroupedSkillsLoading = getAvailableGroupedSkillsQuery.$pending.map(
  (pending) => pending
);
$availableGroupedSkills.on(
  getAvailableGroupedSkillsQuery.finished.success,
  (_, { result }) => result
);

export const form = createForm({
  fields: {
    title: {
      init: '',
      rules: [validateRules.required()]
    },
    description: {
      init: '',
      rules: [validateRules.required()]
    },
    skills: {
      init: [] as string[],
      rules: [validateRules.requiredArray()]
    }
  },
  validateOn: ['submit']
});

export const modalConfirmFx = createEffect(() => {
  form.submit();
});

const openModalFx = createEffect(() =>
  modals.openConfirmModal({
    title: 'Создать вакансию',
    children: <CreateVacancy />,
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

const modalCloseFx = createEffect<string, void, Error>((id) => {
  modals.close(id);
});

sample({
  clock: modalOpened,
  target: [form.reset, openModalFx, getAvailableGroupedSkillsQuery.start]
});

sample({
  clock: form.formValidated,
  target: createVacancyQuery.start
});

sample({
  clock: createVacancyQuery.finished.success,
  source: openModalFx.doneData,
  target: [
    modalCloseFx,
    showSuccessNotificationFx.prepend(() => ({
      title: 'Вакансия создана',
      message: 'Вакансия успешно создана'
    }))
  ]
});

sample({
  clock: createVacancyQuery.finished.failure,
  filter: ({ error }) => error.statusCode !== 403,
  target: showError('Ошибка при создании вакансии')
});
