import { z } from 'zod'

export const signUpSchema = z
  .object({
    confirmationPassword: z
      .string()
      .min(1, 'password confirmation is required')
      .min(6, 'password can not be less than 6 symbols'),
    newPassword: z
      .string()
      .min(1, 'password is required')
      .min(6, 'password can not be less than 6 symbols'),
    username: z.string().min(1, 'username is required'),
  })
  .refine(data => data.newPassword === data.confirmationPassword)
