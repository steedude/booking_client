export interface User {
  id: string;
  name: string;
  account: string;
  team: string;
  image: string;
}

export interface GoogleAuthPayload {
  credential: string;
}

export interface LoginPayload {
  account: string;
  password: string;
}

export interface UserInfoPayload {
  team_id: string;
  name: string;
}

export interface TeamOption {
  _id: string;
  name: string;
}

export interface PasswordPayload {
  password: string;
}
