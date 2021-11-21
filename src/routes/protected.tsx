import { Navigate } from 'react-router-dom';

import App from './app';

import { lazyImport } from '@/utils/lazyImport';

const { DiscussionsRoutes } = lazyImport(
  () => import('@/features/discussions'),
  'DiscussionsRoutes'
);
const { TasksRoutes } = lazyImport(() => import('@/features/tasks'), 'TasksRoutes');
const { Dashboard } = lazyImport(() => import('@/features/misc'), 'Dashboard');
const { Profile } = lazyImport(() => import('@/features/users'), 'Profile');
const { Users } = lazyImport(() => import('@/features/users'), 'Users');

export const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [
      { path: '/app/discussions/*', element: <DiscussionsRoutes /> },
      { path: '/app/tasks/*', element: <TasksRoutes /> },
      { path: '/app/users', element: <Users /> },
      { path: '/app/profile', element: <Profile /> },
      { path: '/app/', element: <Dashboard /> },
      { path: '/app/*', element: <Navigate to="." /> },
    ],
  },
];
