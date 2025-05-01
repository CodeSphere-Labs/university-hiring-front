import { validateRules } from '@/shared/config/validateRules';
import { createModalAction } from '@/shared/factories/createModalAction';

import { createOrganizationQuery } from '../api/api';
import { CreateOrganization } from './CreateOrganization';

export const $loading = createOrganizationQuery.$pending.map((pending) => pending);

export const { modalOpened, form } = createModalAction({
  Component: <CreateOrganization />,
  errorNotification: 'Ошибка при создании организации',
  formConfig: {
    fields: {
      name: {
        init: '',
        rules: [validateRules.required()]
      },
      email: {
        init: '',
        rules: [validateRules.required(), validateRules.email()]
      },
      about: {
        init: '',
        rules: [validateRules.required()]
      },
      websiteUrl: {
        init: '',
        rules: [validateRules.required(), validateRules.url()]
      }
    },
    validateOn: ['submit']
  },
  labels: {
    cancel: 'Назад',
    confirm: 'Создать'
  },
  submitTarget: createOrganizationQuery,
  successNotification: {
    title: 'Организация создана',
    message: 'Организация успешно создана'
  },
  title: 'Создать организацию'
});
