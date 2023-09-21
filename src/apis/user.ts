import request from '@/utils/request';
import type { LoginPayload } from '@/types/user';

export function loginUserApi(data: LoginPayload) {
  return request.post('/login', data);
}

export function logoutUserApi() {
  return request.post('/logout');
}
