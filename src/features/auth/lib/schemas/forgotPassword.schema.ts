import { z } from 'zod'

export const forgotPasswordScheme = z.object({
  baseUrl: z.string(),
  email: z.string().email().min(1, 'email is required'),
  recaptcha: z.string().min(1, 'Please complete the reCAPTCHA'),
})

export type forgotPasswordData = z.infer<typeof forgotPasswordScheme>
