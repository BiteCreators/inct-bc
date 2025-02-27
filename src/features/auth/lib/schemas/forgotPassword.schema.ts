import { LocaleType } from '@byte-creators/utils'
import { z } from 'zod'

export const createForgotPasswordSchema = (t: LocaleType['Auth']['errors']) =>
  z.object({
    baseUrl: z.string(),
    email: z.string().email().min(1, t.emailRequiredError),
    recaptcha: z.string().min(1, t.recaptcha),
  })

export type ForgotPasswordFormData = z.infer<ReturnType<typeof createForgotPasswordSchema>>
