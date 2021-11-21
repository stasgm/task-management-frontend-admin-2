import { UsersList } from '../components/UsersList';

import { ContentLayout } from '@/components/Layout';
import { Authorization, ROLES } from '@/lib/authorization';

export const Users = () => {
  return (
    <ContentLayout title="Users">
      <div className="mt-4">
        <Authorization
          forbiddenFallback={<div>Only admin can view this.</div>}
          allowedRoles={[ROLES.admin]}
        >
          <UsersList />
        </Authorization>
      </div>
    </ContentLayout>
  );
};
