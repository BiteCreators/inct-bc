import { LocaleType } from '@/locales/en'
import { z } from 'zod'

export const createSignUpSchema = (t: LocaleType['Auth']) => {
  return z
    .object({
      agreedToPrivacyPolicy: z.boolean({
        required_error: t.privacyPolicyRequiredError,
      }),
      email: z.string().email({ message: t.emailInvalidError }).min(1, t.emailRequiredError),
      password: z
        .string()
        .min(1, t.passwordRequiredError)
        .max(30, t.passwordTooLongError)
        .min(6, t.passwordTooShortError)
        .regex(
          new RegExp(/^[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/g),
          t.passwordInvalidError
        ),
      passwordConfirmation: z
        .string()
        .min(1, t.passwordConfirmationRequiredError)
        .min(6, t.passwordTooShortError),
      username: z
        .string()
        .min(1, t.usernameRequiredError)
        .min(6, t.usernameTooShortError)
        .max(30, t.usernameTooShortError),
    })
    .refine(data => data.password === data.passwordConfirmation, {
      message: t.passwordConfirmationInvalidError,
      path: ['passwordConfirmation'],
    })
}

export type SignUpFormData = z.infer<ReturnType<typeof createSignUpSchema>>
