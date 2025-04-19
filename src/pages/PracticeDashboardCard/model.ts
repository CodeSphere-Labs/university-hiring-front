import { createStore, sample } from 'effector';

import type { Practice } from '@/shared/api/types';

import { routes } from '@/shared/routing';
import { chainAuthorized } from '@/shared/session/model';

import { getPracticeQuery } from './api';

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
