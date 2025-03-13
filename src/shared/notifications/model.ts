import { notifications } from '@mantine/notifications'
import { createEffect } from 'effector'

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
