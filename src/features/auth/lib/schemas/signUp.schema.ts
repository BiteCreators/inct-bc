import { z } from 'zod'

import { AUTH_ERRORS } from '../consts'

export const signUpSchema = z
  .object({
    agreedToPrivacyPolicy: z.boolean({ required_error: AUTH_ERRORS.PRIVACY_POLICY_REQUIRED_ERROR }),
    email: z
      .string()
      .email({ message: AUTH_ERRORS.EMAIL_INVALID_ERROR })
      .min(1, AUTH_ERRORS.EMAIL_REQUIRED_ERROR),
    password: z
      .string()
      .min(1, AUTH_ERRORS.PASSWORD_REQUIRED_ERROR)
      .max(30, AUTH_ERRORS.PASSWORD_TOO_LONG_ERROR)
      .min(6, AUTH_ERRORS.PASSWORD_TOO_SHORT_ERROR)
      .regex(
        new RegExp(/^[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/g),
        AUTH_ERRORS.PASSWORD_INVALID_ERROR
      ),
    passwordConfirmation: z
      .string()
      .min(1, AUTH_ERRORS.PASSOWRD_CONFIRMATION_REQUIRED_ERROR)
      .min(6, AUTH_ERRORS.PASSWORD_TOO_SHORT_ERROR),
    username: z
      .string()
      .min(1, AUTH_ERRORS.USERNAME_REQUIRED_ERROR)
      .min(6, AUTH_ERRORS.USERNAME_TOO_SHORT_ERROR)
      .max(30, AUTH_ERRORS.USERNAME_TOO_LONG_ERROR),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: AUTH_ERRORS.PASSOWRD_CONFIRMATION_INVALID_ERROR,
    path: ['passwordConfirmation'],
  })

export type SignUpFormData = z.infer<typeof signUpSchema>

//Decided not to do it with hook, but not 100% sure
// export const useSingUpSchema = () => {
//   const t = useScopedTranslation('Auth')

//   const signUpSchema = z
//     .object({
//       agreedToPrivacyPolicy: z.boolean({ required_error: 'privacyPolicyRequiredError' }),
//       email: z.string().email({ message: t.emailInvalidError }).min(1, 'email is required'),
//       password: z
//         .string()
//         .min(1, t.passwordRequiredError)
//         .min(6, 'password can not be less than 6 symbols'),
//       passwordConfirmation: z
//         .string()
//         .min(1, 'password confirmation is required')
//         .min(6, 'password can not be less than 6 symbols'),
//       username: z.string().min(1, 'username is required').max(30, t.usernameLongError),
//     })
//     .refine(data => data.password === data.passwordConfirmation)

//   return signUpSchema
// }
