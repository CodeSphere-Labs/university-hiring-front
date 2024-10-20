import '@mantine/core/styles.css'

import { MantineProvider } from '@mantine/core'
import { RouterProvider } from 'atomic-router-react'
import { Suspense } from 'react'

import { Pages } from '@/pages'
import { router } from '@/shared/routing/index'
import { LoadingPage } from '@/shared/ui/LoadingPage/LoadingPage'

export const App = () => {
  return (
    <RouterProvider router={router}>
      <MantineProvider>
        <Suspense fallback={<LoadingPage />}>
          <Pages />
        </Suspense>
      </MantineProvider>
    </RouterProvider>
  )
}
