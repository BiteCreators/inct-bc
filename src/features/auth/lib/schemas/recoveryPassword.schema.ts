import { LocaleType } from '@byte-creators/utils'
import { z } from 'zod'

export const createRecoveryPasswordSchema = (t: LocaleType['Auth']['errors']) =>
  z
    .object({
      confirmationPassword: z
        .string()
        .min(1, t.passwordConfirmationRequired)
        .min(6, t.passwordTooShortError),
      newPassword: z
        .string()
        .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/, t.passwordMustContain),
    })
    .refine(data => data.newPassword === data.confirmationPassword, {
      message: t.passwordConfirmationInvalidError,
      path: ['confirmationPassword'],
    })

export type RecoveryPasswordFormData = z.infer<ReturnType<typeof createRecoveryPasswordSchema>>
