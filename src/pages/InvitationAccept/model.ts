import { createStore, sample } from 'effector';
import { createForm } from 'effector-forms';

import type { InvitationErrorKey } from '@/shared/config/errorCodes';

import { validateRules } from '@/shared/config/validateRules';
import { showError, showSuccess } from '@/shared/notifications/model';
import { routes } from '@/shared/routing';
import { sessionQuery } from '@/shared/session/api';
import { chainAnonymous } from '@/shared/session/model';

import { acceptInvitationQuery, checkInvitationQuery } from './api';

export const currentRoute = routes.invitationAccept;
export const anonymousRouteRoute = chainAnonymous(currentRoute, {
  otherwise: routes.home.open
});

export const $error = createStore<InvitationErrorKey | null>(null);
$error.on(checkInvitationQuery.finished.failure, (_, { error }) => error.data?.message);

export const $loading = checkInvitationQuery.$pending.map((pending) => pending);
export const $loadingAccept = acceptInvitationQuery.$pending.map((pending) => pending);

export const form = createForm({
  fields: {
    firstName: {
      init: '',
      rules: [validateRules.required()]
    },
    lastName: {
      init: '',
      rules: [validateRules.required()]
    },
    patronymic: {
      init: '',
      rules: [validateRules.required()]
    },
    email: {
      init: '',
      rules: [validateRules.required(), validateRules.email()]
    },
    password: {
      init: '',
      rules: [validateRules.password()]
    }
  },
  validateOn: ['submit']
});

sample({
  clock: anonymousRouteRoute.opened,
  source: anonymousRouteRoute.$params,
  fn: (params) => params.token,
  target: checkInvitationQuery.start
});

sample({
  clock: form.formValidated,
  source: anonymousRouteRoute.$params,
  fn: (params, fields) => ({
    body: {
      email: fields.email,
      firstName: fields.firstName,
      lastName: fields.lastName,
      patronymic: fields.patronymic,
      password: fields.password
    },
    token: params.token
  }),
  target: acceptInvitationQuery.start
});

sample({
  clock: acceptInvitationQuery.finished.success,
  target: showSuccess({
    title: 'Вы успешно приняли приглашение',
    message: 'Желаем вам удачи в учебе и карьере'
  })
});

sample({
  clock: acceptInvitationQuery.finished.failure,
  target: showError('Ошибка при принятии приглашения')
});

sample({
  clock: acceptInvitationQuery.finished.success,
  target: sessionQuery.start
});
