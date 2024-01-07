import { TypeOf, z } from 'zod';

export const registerSchema = z.object({
  body: z
    .object({
      username: z
        .string({
          required_error: 'Username is required',
          invalid_type_error: 'Username must be a string',
        })
        .min(5, { message: 'Username must contain at least 5 characters' })
        .max(15, { message: 'The username must contain a maximum of 15 characters' }),
      email: z.string({ required_error: 'Email is required' }).email({ message: 'The email is not valid' }),
      password: z
        .string({
          required_error: 'Password is required',
          invalid_type_error: 'Password must be a string',
        })
        .min(6, { message: 'Password must contain at least 6 characters' })
        .max(15, { message: 'The password must contain a maximum of 15 characters' }),
      confirmPassword: z
        .string({
          required_error: 'Confirm password is required',
          invalid_type_error: 'Confirm password must be a string',
        })
        .min(6, { message: 'Confirm password must contain at least 6 characters' })
        .max(15, { message: 'The confirm password must contain a maximum of 15 characters' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['passwordConfirmation'],
    }),
});

export const loginSchema = z.object({
  body: z.object({
    userOrEmail: z
      .string({
        required_error: 'Username or email required',
        invalid_type_error: 'Username or email must be a string',
      })
      .min(1, { message: 'Username or email required' }),
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
      })
      .min(1, { message: 'Password is required' }),
  }),
});

export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z
      .string({
        required_error: 'Refresh token is required',
        invalid_type_error: 'Refresh token must be a string',
      })
      .min(1, { message: 'Refresh token is required' }),
  }),
});

export type RegisterInput = TypeOf<typeof registerSchema>['body'];

export type LoginInput = TypeOf<typeof loginSchema>['body'];

export type RefreshTokenInput = TypeOf<typeof refreshTokenSchema>['body'];
