import { LocaleType } from '@byte-creators/utils'
import { z } from 'zod'

export const createSignInSchema = (t: LocaleType['Auth']['errors']) => {
  return z.object({
    email: z.string().email('').min(1, t.emailRequiredError),
    password: z
      .string()
      .min(1, t.passwordRequiredError)
      .max(30, t.passwordTooLongError)
      .min(6, t.passwordTooShortError)
      .regex(new RegExp(/^[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/g), t.passwordInvalidError),
  })
}

export type SignInFormData = z.infer<ReturnType<typeof createSignInSchema>>
