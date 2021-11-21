// import { Navigate, useRoutes } from 'react-router-dom';
import { Navigate, useRoutes } from 'react-router-dom';

import { NotFound } from '../features/misc';

import App from './app';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

// import { Dashboard } from '@/features/misc';
import { useAuth } from '@/lib/auth';

export const AppRoutes = () => {
  const { user } = useAuth();
  const isLoggedIn = !!user;

  // const elements = isLoggedIn ? <App /> : <Navigate to={'./auth/login'} />;
  const commonRoutes = [
    {
      path: '/',
      // element: elements,
      children: [
        {
          path: '/',
          element: isLoggedIn ? <App /> : <Navigate to={'./auth/login'} />,
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ];
  const routes = isLoggedIn ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);
  // const element = useRoutes([...routes]);

  return <>{element}</>;
};
