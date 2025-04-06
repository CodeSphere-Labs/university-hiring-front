import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { RouterProvider } from 'atomic-router-react';
import { Suspense } from 'react';

import { Pages } from '@/pages';
import { router } from '@/shared/routing/index';
import { LoadingPage } from '@/shared/ui/LoadingPage/LoadingPage';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import 'mantine-datatable/styles.layer.css';
import './styles/index.css';

export const App = () => {
  return (
    <RouterProvider router={router}>
      <MantineProvider>
        <ModalsProvider>
          <Notifications zIndex={1005} />
          <Suspense fallback={<LoadingPage />}>
            <Pages />
          </Suspense>
        </ModalsProvider>
      </MantineProvider>
    </RouterProvider>
  );
};
