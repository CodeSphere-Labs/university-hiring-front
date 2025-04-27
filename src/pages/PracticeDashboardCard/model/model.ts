import { createStore, sample } from 'effector';

import type { Practice } from '@/shared/api/types';

import { routes } from '@/shared/routing';
import { chainAuthorized } from '@/shared/session/model';

import { getPracticeQuery } from '../api/api';
import { connectFx, disconnected } from '../chat/chat.model';

export const currentRoute = routes.practice;

export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.signIn.open
});

export const $practice = createStore<Practice | null>(null);
$practice.on(getPracticeQuery.finished.success, (_, { result }) => result);

export const $practiceLoading = getPracticeQuery.$pending.map((pending) => pending);

sample({
  clock: authorizedRoute.opened,
  fn: ({ params }) => params.id,
  target: getPracticeQuery.start
});

sample({
  clock: authorizedRoute.opened,
  fn: ({ params }) => params.id,
  target: connectFx
});

sample({
  clock: authorizedRoute.closed,
  target: disconnected
});
