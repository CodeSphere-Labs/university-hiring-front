import '@mantine/core/styles.css'

import { MantineProvider } from '@mantine/core'
import { RouterProvider } from 'atomic-router-react'

import { Pages } from '@/pages'
import { router } from '@/shared/routing/index'

export const App = () => {
  return (
    <RouterProvider router={router}>
      <MantineProvider>
        <Pages />
      </MantineProvider>
    </RouterProvider>
  )
}
