import { createStore } from 'effector';

import type { GroupedSkill } from '@/shared/api/types';

import { createVacancyQuery } from '@/features/ActionCards/api/api';
import { getAvailableGroupedSkillsQuery } from '@/pages/Profile/api/api';
import { validateRules } from '@/shared/config/validateRules';
import { createModalAction } from '@/shared/factories/createModalAction';

import { CreateVacancy } from './CreateVacancy';

import classes from './CreateVacancy.module.css';

export const $loading = createVacancyQuery.$pending.map((pending) => pending);
export const $availableGroupedSkills = createStore<GroupedSkill[]>([]);
export const $availableGroupedSkillsLoading = getAvailableGroupedSkillsQuery.$pending.map(
  (pending) => pending
);
$availableGroupedSkills.on(
  getAvailableGroupedSkillsQuery.finished.success,
  (_, { result }) => result
);

export const { modalOpened, form } = createModalAction({
  Component: <CreateVacancy />,
  errorNotification: 'Ошибка при создании вакансии',
  formConfig: {
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
  },
  labels: {
    cancel: 'Назад',
    confirm: 'Создать'
  },
  openTargets: [getAvailableGroupedSkillsQuery.start],
  submitTarget: createVacancyQuery,
  successNotification: {
    title: 'Вакансия создана',
    message: 'Вакансия успешно создана'
  },
  title: 'Создать вакансию',
  modalClassNames: {
    inner: classes.modalInner
  }
});
