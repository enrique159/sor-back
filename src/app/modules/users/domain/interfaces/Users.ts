export interface Users {
  users: User[];
}

export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface UserId {
  userId: string;
}
