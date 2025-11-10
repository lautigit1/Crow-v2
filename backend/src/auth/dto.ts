import { z } from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
});

export class RegisterDto {
  static zodSchema = RegisterSchema;
  email!: string;
  password!: string;
  name!: string;
}

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export class LoginDto {
  static zodSchema = LoginSchema;
  email!: string;
  password!: string;
}

export const RefreshSchema = z.object({
  refreshToken: z.string().min(10),
});
export class RefreshDto {
  static zodSchema = RefreshSchema;
  refreshToken!: string;
}

export type JwtPayload = { sub: string; email: string; role?: string };
