import type { ValidationEvent } from 'effector-forms';

import { createEvent, createStore, sample } from 'effector';
import { createForm } from 'effector-forms';

import type { GroupedSkill } from '@/shared/api/types';

import { validateRules } from '@/shared/config/validateRules';
import { showError, showSuccess } from '@/shared/notifications/model';
import { routes } from '@/shared/routing/index';
import { sessionQuery } from '@/shared/session/api';
import { $user, chainAuthorized } from '@/shared/session/model';
import { removeEmptyValues } from '@/shared/utils';

import { deleteProjectQuery, getAvailableGroupedSkillsQuery, updateUserQuery } from '../api/api';

export const currentRoute = routes.profile;
export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.signIn.open
});

export const $availableGroupedSkills = createStore<GroupedSkill[]>([]);
export const $availableGroupedSkillsLoading = getAvailableGroupedSkillsQuery.$pending.map(
  (pending) => pending
);
$availableGroupedSkills.on(
  getAvailableGroupedSkillsQuery.finished.success,
  (_, { result }) => result
);
export const $updateProfileLoading = updateUserQuery.$pending.map((pending) => pending);

export const profileSaved = createEvent();
export const projectDeleted = createEvent<string>();
$user.on(deleteProjectQuery.finished.success, (_, { result }) => result);

export const baseForm = createForm({
  fields: createBaseFields(),
  validateOn: ['submit'] as ValidationEvent[]
});

export const studentForm = createForm({
  fields: createStudentFields(),
  validateOn: ['submit'] as ValidationEvent[]
});

export const companyForm = createForm({
  fields: createCompanyFields(),
  validateOn: ['submit'] as ValidationEvent[]
});

sample({
  clock: authorizedRoute.opened,
  target: getAvailableGroupedSkillsQuery.start
});

sample({
  clock: [baseForm.formValidated, studentForm.formValidated, companyForm.formValidated],
  fn: (values) => {
    if ('group' in values) {
      const { group, ...rest } = values;
      return removeEmptyValues(rest);
    }
    return removeEmptyValues(values);
  },
  target: updateUserQuery.start
});

sample({
  clock: [sessionQuery.finished.success, updateUserQuery.finished.success],
  fn: ({ result }) => {
    const baseData = {
      firstName: result.firstName,
      lastName: result.lastName,
      patronymic: result.patronymic,
      email: result.email,
      aboutMe: result.aboutMe || '',
      telegramLink: result.telegramLink || '',
      vkLink: result.vkLink || ''
    };

    if (result.role === 'STUDENT') {
      return {
        ...baseData,
        group: result.studentProfile?.group?.name || '',
        githubLink: result.studentProfile?.githubLink || '',
        resume: result.studentProfile?.resume || null,
        skills: result.studentProfile?.skills || []
      };
    }

    // if (result.role === 'STAFF') {
    //   return {
    //     ...baseData,
    //     companyName: result.companyProfile?.companyName || '',
    //     position: result.companyProfile?.position || '',
    //   }
    // }
    return baseData;
  },
  target: [baseForm.setInitialForm, studentForm.setInitialForm, companyForm.setInitialForm]
});

sample({
  clock: updateUserQuery.finished.failure,
  target: showError('Ошибка при обновлении профиля')
});

sample({
  clock: updateUserQuery.finished.success,
  target: showSuccess({
    title: 'Профиль обновлен',
    message: 'Ваши данные успешно сохранены'
  })
});

sample({
  clock: projectDeleted,
  target: deleteProjectQuery.start
});

sample({
  clock: deleteProjectQuery.finished.success,
  target: showSuccess({
    title: 'Проект удален',
    message: 'Проект успешно удален'
  })
});

sample({
  clock: deleteProjectQuery.finished.failure,
  target: showError('Ошибка при удалении проекта')
});

function createBaseFields() {
  return {
    firstName: {
      init: '',
      rules: [validateRules.required()],
      validateOn: ['change'] as ValidationEvent[]
    },
    lastName: {
      init: '',
      rules: [validateRules.required()],
      validateOn: ['change'] as ValidationEvent[]
    },
    patronymic: {
      init: '',
      rules: [validateRules.required()],
      validateOn: ['change'] as ValidationEvent[]
    },
    email: {
      init: '',
      rules: [validateRules.required(), validateRules.email()]
    },
    aboutMe: {
      init: '',
      rules: []
    },
    telegramLink: {
      init: '',
      rules: [validateRules.telegramLink()],
      validateOn: ['change'] as ValidationEvent[]
    },
    vkLink: {
      init: '',
      rules: [validateRules.vkLink()],
      validateOn: ['change'] as ValidationEvent[]
    }
  };
}

function createStudentFields() {
  return {
    ...createBaseFields(),
    group: {
      init: '',
      rules: [validateRules.required()]
    },
    githubLink: {
      init: '',
      rules: [validateRules.gitHubUserLink()],
      validateOn: ['change'] as ValidationEvent[]
    },
    // resume: {
    //   init: '',
    //   rules: [validateRules.required()]
    // },
    skills: {
      init: [] as string[],
      rules: [validateRules.requiredArray()]
    }
  };
}

function createCompanyFields() {
  return {
    ...createBaseFields(),
    companyName: {
      init: '',
      rules: []
    },
    position: {
      init: '',
      rules: []
    }
  };
}

export function getFormByRole(role: string) {
  switch (role) {
    case 'STUDENT':
      return studentForm;
    case 'COMPANY':
      return companyForm;
    default:
      return baseForm;
  }
}
