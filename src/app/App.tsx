import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import './styles/index.css'

import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { RouterProvider } from 'atomic-router-react'
import { Suspense } from 'react'

import { Pages } from '@/pages'
import { router } from '@/shared/routing/index'
import { LoadingPage } from '@/shared/ui/LoadingPage/LoadingPage'

export const App = () => {
  return (
    <RouterProvider router={router}>
      <MantineProvider>
        <Notifications />
        <Suspense fallback={<LoadingPage />}>
          <Pages />
        </Suspense>
      </MantineProvider>
    </RouterProvider>
  )
}
