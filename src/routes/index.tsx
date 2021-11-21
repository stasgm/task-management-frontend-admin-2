import { Navigate, useRoutes } from 'react-router-dom';

// import { Landing } from '@/features/misc';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

import { Dashboard } from '@/features/misc';
import { useAuth } from '@/lib/auth';

export const AppRoutes = () => {
  const auth = useAuth();

  // const commonRoutes = [{ path: '/', element: <Landing /> }];
  const elements = auth.user ? <Dashboard /> : <Navigate to={'/auth/login'} />;
  const commonRoutes = [{ path: '/', element: elements }];

  const routes = auth.user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
