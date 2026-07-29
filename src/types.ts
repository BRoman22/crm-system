export interface MetaResponse<T, N> {
  data: T[];
  info: N;
  meta: {
    totalAmount: number;
  };
}

export interface Todo {
  id: number;
  title: string;
  created: string; // ISO date string
  isDone: boolean;
}

export interface TodoInfo {
  all: number;
  completed: number;
  inWork: number;
}

export type TodoInfoFilters = keyof TodoInfo;

export interface AuthData {
  login: string;
  password: string;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshToken {
  refreshToken: string;
}

export interface UserRegistration {
  login: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
}

export type Role = 'ADMIN' | 'USER' | 'MODERATOR';
export interface Profile {
  id: number;
  username: string;
  email: string;
  date: string;
  isBlocked: boolean;
  roles: Role[];
  phoneNumber: string;
}

export interface ProfileRequest {
  username?: string;
  email?: string;
  phoneNumber?: string;
}

export interface PasswordRequest {
  password: string;
}

export interface AdminMetaResponse<T> {
  data: T[];
  meta: {
    totalAmount: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  };
}

export interface UserFilters {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  isBlocked?: boolean;
  limit?: number; // сколько на странице
  page?: number; // страницу
}

export interface UserRolesRequest {
  roles: Role[];
  // при вызове этой апи роли будут обновлены к тому массиву который будет передан
  // например если у вас была roles: ['ADMIN'] а вы хотите добавить ['MODERATOR'] то нужно передавать
  // старые + новые - roles: ['ADMIN', 'MODERATOR']
}
