import { querySync } from 'atomic-router'
import { createEvent, createStore, sample } from 'effector'

import {
  InvintationResponse,
  InvitationFilter,
  InvitationParams,
  InvitationStatus,
} from '@/shared/api/types'
import {
  showError,
  showSuccessNotificationFx,
} from '@/shared/notifications/model'
import { controls, routes } from '@/shared/routing/index'
import { $user, chainAuthorized, chainRole } from '@/shared/session/model'

import {
  deleteInvitationQuery,
  getInvitationsQuery,
  refreshInvitationQuery,
} from './api'

const DEFAULT_FILTER = 'createdByMe'
const DEFAULT_STATUS = 'all'
const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10

export const currentRoute = routes.invitations
export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.signIn.open,
})

export const authorizedRouteRole = chainRole(
  authorizedRoute,
  ['ADMIN', 'UNIVERSITY_STAFF', 'STAFF'],
  {
    otherwise: routes.home.open,
  },
)

export const pageChanged = createEvent<number>()
export const recordsPerPageChanged = createEvent<number>()
export const filterChanged = createEvent<InvitationFilter>()
export const statusChanged = createEvent<InvitationStatus>()

export const deletedInvitation = createEvent<number>()
export const refreshedInvitation = createEvent<number>()

export const $invitations = createStore<InvintationResponse>({
  data: [],
  meta: {
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 1,
  },
})
$invitations.on(getInvitationsQuery.finished.success, (_, { result }) => result)
$invitations.on(
  deleteInvitationQuery.finished.success,
  (state, { result }) => ({
    ...state,
    data: state.data.filter((invitation) => invitation.id !== result.id),
  }),
)
$invitations.on(
  refreshInvitationQuery.finished.success,
  (state, { result }) => ({
    ...state,
    data: state.data.filter((invitation) => invitation.id !== result.id),
  }),
)

export const $loading = getInvitationsQuery.$pending.map((pending) => pending)

export const $page = createStore(DEFAULT_PAGE)
$page.on(pageChanged, (_, page) => page)

export const $recordsPerPage = createStore(DEFAULT_LIMIT)
$recordsPerPage.on(recordsPerPageChanged, (_, recordsPerPage) => recordsPerPage)

export const $filter = createStore<InvitationFilter>(DEFAULT_FILTER)
$filter.on(filterChanged, (_, filter) => filter)

export const $status = createStore<InvitationStatus>(DEFAULT_STATUS)
$status.on(statusChanged, (_, status) => status)

sample({
  clock: [statusChanged, filterChanged],
  fn: () => DEFAULT_PAGE,
  target: $page,
})

sample({
  clock: authorizedRoute.opened,
  source: {
    query: authorizedRoute.$query,
    user: $user,
  },
  fn: ({ query, user }) => {
    const filter =
      user?.role === 'ADMIN'
        ? (query.filter as InvitationFilter) || DEFAULT_FILTER
        : DEFAULT_FILTER
    const status = (query.status as InvitationStatus) || DEFAULT_STATUS
    const page = Number(query.page) || DEFAULT_PAGE
    const limit = Number(query.limit) || DEFAULT_LIMIT

    return { filter, status, page, limit } as InvitationParams
  },
  target: getInvitationsQuery.start,
})

querySync({
  source: {
    filter: $filter,
    status: $status,
    page: $page,
    limit: $recordsPerPage,
  },
  route: authorizedRouteRole,
  controls,
})

sample({
  clock: authorizedRoute.opened,
  source: authorizedRoute.$query,
  fn: (query) => Number(query.page) || DEFAULT_PAGE,
  target: $page,
})

sample({
  clock: authorizedRoute.opened,
  source: authorizedRoute.$query,
  fn: (query) => Number(query.limit) || DEFAULT_LIMIT,
  target: $recordsPerPage,
})

sample({
  clock: authorizedRoute.opened,
  source: authorizedRoute.$query,
  fn: (query) => (query.status as InvitationStatus) || DEFAULT_STATUS,
  target: $status,
})

sample({
  clock: authorizedRoute.opened,
  source: authorizedRoute.$query,
  fn: (query) => (query.filter as InvitationFilter) || DEFAULT_FILTER,
  target: $filter,
})

sample({
  clock: [pageChanged, recordsPerPageChanged, filterChanged, statusChanged],
  source: {
    page: $page,
    recordsPerPage: $recordsPerPage,
    filter: $filter,
    status: $status,
  },
  fn: ({ page, recordsPerPage, filter, status }) => ({
    filter,
    status,
    page,
    limit: recordsPerPage,
  }),
  target: getInvitationsQuery.start,
})

sample({
  clock: deletedInvitation,
  target: deleteInvitationQuery.start,
})

sample({
  clock: deleteInvitationQuery.finished.success,
  target: showSuccessNotificationFx.prepend(() => ({
    title: 'Приглашение удалено',
    message: 'Приглашение успешно удалено',
  })),
})

sample({
  clock: deleteInvitationQuery.finished.failure,
  target: showError('Не удалось удалить приглашение'),
})

sample({
  clock: refreshedInvitation,
  target: refreshInvitationQuery.start,
})

sample({
  clock: refreshInvitationQuery.finished.success,
  target: showSuccessNotificationFx.prepend(() => ({
    title: 'Приглашение обновлено',
    message: 'Приглашение успешно обновлено',
  })),
})

sample({
  clock: refreshInvitationQuery.finished.failure,
  target: showError('Не удалось обновить приглашение'),
})
