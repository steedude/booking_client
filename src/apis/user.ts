import request from '@/utils/request';
import type { LoginPayload, GoogleAuthPayload } from '@/types/user';

export function loginUserApi(data: LoginPayload) {
  return request.post('/login', data);
}

export function logoutUserApi() {
  return request.post('/logout');
}

export function googleAuthApi(data: GoogleAuthPayload) {
  return request.post('/googleAuth', data);
}

export function registerUserApi(data: LoginPayload) {
  return request.post('/register', data);
}

export function getUserInfoApi() {
  return request.get('/user');
}
