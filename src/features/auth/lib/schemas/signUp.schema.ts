import { z } from 'zod'

export const signUpSchema = z
  .object({
    agreedToPrivacyPolicy: z.boolean({ required_error: 'you must agree to privacy policy' }),
    email: z.string().email().min(1, 'email is required'),
    password: z
      .string()
      .min(1, 'password is required')
      .min(6, 'password can not be less than 6 symbols'),
    passwordConfirmation: z
      .string()
      .min(1, 'password confirmation is required')
      .min(6, 'password can not be less than 6 symbols'),
    username: z.string().min(1, 'username is required'),
  })
  .refine(data => data.password === data.passwordConfirmation)

export type SignUpFormData = z.infer<typeof signUpSchema>
