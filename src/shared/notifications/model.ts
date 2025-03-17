import { notifications } from '@mantine/notifications'
import { createEffect } from 'effector'

import { ErrorResponse } from '@/shared/api/types'
import { ErrorMessages } from '@/shared/config/errorCodes'

interface NotificationParams {
  title: string
  message: string
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

const apiErrorFx = createEffect(
  ({ error, message = 'Произошла ошибка' }: ApiErrorParams) => {
    notifications.show({
      color: 'red',
      title: ErrorMessages[error.data?.message ?? 'default'],
      message,
      position: 'top-right',
    })
  },
)

export const showError = (message: string) =>
  apiErrorFx.prepend(({ error }: { error: ErrorResponse }) => ({
    error,
    message,
  }))
