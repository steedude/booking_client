export interface User {
  id?: string;
  account?: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}
