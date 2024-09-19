import { z } from 'zod'

export const signUpSchema = z
  .object({
    agreedToPrivacyPolicy: z.boolean({ required_error: 'privacyPolicyRequiredError' }),
    email: z.string().email().min(1, 'email is required'),
    password: z
      .string()
      .min(1, 'passwordRequiredError')
      .min(6, 'password can not be less than 6 symbols'),
    passwordConfirmation: z
      .string()
      .min(1, 'password confirmation is required')
      .min(6, 'password can not be less than 6 symbols'),
    username: z.string().min(1, 'username is required'),
  })
  .refine(data => data.password === data.passwordConfirmation)

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
