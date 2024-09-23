import { z } from 'zod'

export const recoveryPasswordSchema = z
  .object({
    confirmationPassword: z
      .string()
      .min(1, 'password confirmation is required')
      .min(6, 'password can not be less than 6 symbols'),
    newPassword: z
      .string()
      .min(1, 'password is required')
      .min(6, 'password can not be less than 6 symbols')
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
        'Password must contain at least one uppercase letter, one number, and one special character'
      ),
  })
  .refine(data => data.newPassword === data.confirmationPassword)

export type recoveryPasswordSchemaData = z.infer<typeof recoveryPasswordSchema>
