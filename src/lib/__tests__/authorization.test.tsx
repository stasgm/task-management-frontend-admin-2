import { Authorization, ROLES } from '../authorization';

import { createUser, render, screen } from '@/test/test-utils';

test('should view protected resource if user role is matching', async () => {
  const user = await createUser({
    role: ROLES.admin,
  });

  const protectedResource = 'This is very confidential data';

  await render(<Authorization allowedRoles={[ROLES.admin]}>{protectedResource}</Authorization>, {
    user,
  });

  expect(screen.getByText(protectedResource)).toBeInTheDocument();
});

test('should not view protected resource if user role does not match and show fallback message instead', async () => {
  const user = await createUser({
    role: ROLES.user,
  });

  const protectedResource = 'This is very confidential data';

  const forbiddenMessage = 'You are unauthorized to view this resource';
  await render(
    <Authorization forbiddenFallback={<div>{forbiddenMessage}</div>} allowedRoles={[ROLES.admin]}>
      {protectedResource}
    </Authorization>,
    { user }
  );

  expect(screen.queryByText(protectedResource)).not.toBeInTheDocument();

  expect(screen.getByText(forbiddenMessage)).toBeInTheDocument();
});

test('should view protected resource if policy check passes', async () => {
  const user = await createUser({
    role: ROLES.admin,
  });

  const protectedResource = 'This is very confidential data';

  await render(<Authorization policyCheck={true}>{protectedResource}</Authorization>, { user });

  expect(screen.getByText(protectedResource)).toBeInTheDocument();
});

test('should not view protected resource if policy check fails and show fallback message instead', async () => {
  const user = await createUser({
    role: ROLES.user,
  });

  const protectedResource = 'This is very confidential data';

  const forbiddenMessage = 'You are unauthorized to view this resource';
  await render(
    <Authorization forbiddenFallback={<div>{forbiddenMessage}</div>} policyCheck={false}>
      {protectedResource}
    </Authorization>,
    { user }
  );

  expect(screen.queryByText(protectedResource)).not.toBeInTheDocument();

  expect(screen.getByText(forbiddenMessage)).toBeInTheDocument();
});
