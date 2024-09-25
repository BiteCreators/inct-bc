import { LocaleType } from '@/locales/en'
import { z } from 'zod'

export const createForgotPasswordScheme = (t: LocaleType['Auth']) =>
  z.object({
    baseUrl: z.string(),
    email: z.string().email().min(1, t.emailRequiredError),
    recaptcha: z.string().min(1, t.recaptcha),
  })

export type forgotPasswordData = z.infer<ReturnType<typeof createForgotPasswordScheme>>
