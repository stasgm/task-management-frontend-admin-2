import { ContentLayout } from '@/components/Layout';
import { useAuth } from '@/lib/auth';
import { ROLES } from '@/lib/authorization';

export const Dashboard = () => {
  const { user } = useAuth();

  const getName = () =>
    user?.firstName || user?.lastName
      ? `${user?.firstName || ''} ${user?.lastName || ''}`
      : user?.username;

  return (
    <ContentLayout title="Dashboard">
      <h1 className="text-xl mt-2">
        Welcome <b>{getName()}</b>
      </h1>
      <h4 className="my-3">
        Your role is : <b>{user?.role}</b>
      </h4>
      <p className="font-medium">In this application you can:</p>
      {user?.role === ROLES.user && (
        <>
          <ul className="my-4 list-inside list-disc">
            <li>Create tasks </li>
            <li>Edit own tasks</li>
            <li>Delete own tasks</li>
          </ul>
          <ul className="my-4 list-inside list-disc">
            <li>Create comments in discussions</li>
            <li>Delete own comments</li>
          </ul>
        </>
      )}
      {user?.role === ROLES.admin && (
        <>
          <ul className="my-4 list-inside list-disc">
            <li>Create tasks</li>
            <li>Edit tasks</li>
            <li>Delete tasks</li>
            <li>Delete all tasks</li>
          </ul>
          <ul className="my-4 list-inside list-disc">
            <li>Create discussions</li>
            <li>Edit discussions</li>
            <li>Delete discussions</li>
            <li>Comment on discussions</li>
            <li>Delete all comments</li>
          </ul>
        </>
      )}
    </ContentLayout>
  );
};
