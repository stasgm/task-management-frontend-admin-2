import { UserResponse } from '../types';

import { axios } from '@/lib/axios';

export type LoginCredentialsDTO = {
  username: string;
  password: string;
};

export const loginWithUsernameAndPassword = (data: LoginCredentialsDTO): Promise<UserResponse> => {
  return axios.post('/auth/signin', data);
};
