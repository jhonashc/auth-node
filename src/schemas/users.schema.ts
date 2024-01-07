import { TypeOf, z } from 'zod';

export const getProfileSchema = z.object({
  params: z
    .object({
      userId: z.string({ required_error: 'User id is required' }),
    })
    .refine(({ userId }) => !isNaN(+userId), {
      message: 'The user id must be a number.',
      path: ['userId'],
    }),
});

export type GetProfileInput = TypeOf<typeof getProfileSchema>['params'];
