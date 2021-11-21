export type AuthUser = {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  role: 'admin' | 'user';
};

export type UserResponse = {
  access_token: string;
  user: AuthUser;
};
