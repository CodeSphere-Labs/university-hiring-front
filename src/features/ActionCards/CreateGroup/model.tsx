import { validateRules } from '@/shared/config/validateRules';
import { createModalAction } from '@/shared/factories/createModalAction';

import { createGroupQuery } from '../api/api';
import { CreateGroup } from './CreateGroup';

export const $loading = createGroupQuery.$pending.map((pending) => pending);

export const { modalOpened, form } = createModalAction({
  Component: <CreateGroup />,
  errorNotification: 'Ошибка при создании группы',
  formConfig: {
    fields: {
      name: {
        init: '',
        rules: [validateRules.required()]
      }
    },
    validateOn: ['submit']
  },
  labels: {
    cancel: 'Назад',
    confirm: 'Создать'
  },
  submitTarget: createGroupQuery,
  successNotification: {
    title: 'Группа создана',
    message: 'Группа успешно создана'
  },
  title: 'Создать группу'
});
