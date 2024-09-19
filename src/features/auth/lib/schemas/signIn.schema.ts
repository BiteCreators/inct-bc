import { z } from 'zod'

export const signInSchema = z
  .object({
    email: z.string().email('').min(1, 'Email is required'),
    password: z.string().min(1, 'Password is required'),
  })
  .superRefine((data, ctx) => {
    const emailCheck = z.string().email().safeParse(data.email)
    const passwordCheck = data.password.length > 5

    if (!emailCheck.success || !passwordCheck) {
      ctx.addIssue({
        code: 'custom',
        message: 'The email or password are incorrect. Try again please',
        path: ['password'],
      })
    }
  })
export type SignInFormData = z.infer<typeof signInSchema>
