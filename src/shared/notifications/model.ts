import { notifications } from '@mantine/notifications'
import { createEffect } from 'effector'

import type { ErrorResponse } from '@/shared/api/types'

import { ErrorMessages } from '@/shared/config/errorCodes'

interface NotificationParams {
  message: string
  title: string
}

export const showSuccessNotificationFx = createEffect(
  ({ title, message }: NotificationParams) =>
    notifications.show({
      color: 'green',
      title,
      message,
      position: 'top-right',
    }),
)

export const showErrorNotificationFx = createEffect(
  ({ title, message }: NotificationParams) =>
    notifications.show({
      color: 'red',
      title,
      message,
      position: 'top-right',
    }),
)

interface ApiErrorParams {
  error: ErrorResponse
  message: string
}

interface ApiSuccessParams {
  message: string
  title: string
}

const apiErrorFx = createEffect(({ error, message }: ApiErrorParams) => {
  notifications.show({
    color: 'red',
    title: ErrorMessages[error.data?.message ?? 'default'],
    message,
    position: 'top-right',
  })
})

const apiSuccessFx = createEffect(({ title, message }: ApiSuccessParams) => {
  notifications.show({
    color: 'green',
    title,
    message,
    position: 'top-right',
  })
})

export const showError = (message: string) =>
  apiErrorFx.prepend(({ error }: { error: ErrorResponse }) => ({
    error,
    message,
  }))

export const showSuccess = (title: string, message: string) =>
  apiSuccessFx.prepend(() => ({
    title,
    message,
  }))
