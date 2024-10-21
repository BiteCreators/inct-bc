import { LocaleType } from '@/locales/en'
import { z } from 'zod'

export const createSignUpSchema = (t: LocaleType['Auth']['errors']) => {
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
        //server will not accept some of this characters as special, but thats what is written in figma
        .regex(
          new RegExp(/^[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/g),
          t.passwordInvalidError
        )
        .regex(
          new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
          t.passwordNotStrongEnoughError
        ),
      passwordConfirmation: z
        .string()
        .min(1, t.passwordConfirmationRequiredError)
        .min(6, t.passwordTooShortError),
      userName: z
        .string()
        .min(1, t.usernameRequiredError)
        .min(6, t.usernameTooShortError)
        .max(30, t.usernameTooShortError),
    })
    .refine(data => data.password === data.passwordConfirmation, {
      message: t.passwordConfirmationInvalidError,
      path: ['passwordConfirmation'],
    })
    .refine(data => data.agreedToPrivacyPolicy === true, {
      message: t.privacyPolicyRequiredError,
      path: ['agreedToPrivacyPolicy'],
    })
}

export type SignUpFormData = z.infer<ReturnType<typeof createSignUpSchema>>
