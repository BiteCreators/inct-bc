import { LocaleType } from '@/locales/en'
import { z } from 'zod'

export const createRecoveryPasswordSchema = (t: LocaleType['Auth']) =>
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
    .refine(data => data.newPassword === data.confirmationPassword)

export type recoveryPasswordSchemaData = z.infer<ReturnType<typeof createRecoveryPasswordSchema>>
