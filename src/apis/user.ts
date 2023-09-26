import request from '@/utils/request';
import type { LoginPayload, GoogleAuthPayload } from '@/types/user';

export function loginUserApi(data: LoginPayload) {
  return request.post('/api/login', data);
}

export function logoutUserApi() {
  return request.post('/api/logout');
}

export function googleAuthApi(data: GoogleAuthPayload) {
  return request.post('/api/googleAuth', data);
}

export function registerUserApi(data: LoginPayload) {
  return request.post('/api/register', data);
}

export function getUserInfoApi() {
  return request.get('/api/user');
}
