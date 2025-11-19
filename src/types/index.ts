export type User = {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
  [key: string]: any;
};

export type LoginResponse = {
  token: string;
  user?: User;
};

export type JwtPayload = {
  exp?: number;
  iat?: number;
  user?: User;
  [key: string]: any;
};
