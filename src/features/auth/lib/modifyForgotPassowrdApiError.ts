import { Path } from 'react-hook-form'

import { LocaleType } from '@/locales/en'

import { ForgotPasswordFormData } from './schemas/forgotPassword.schema'

export const modifyForgotPasswordApiError = (
  message: string,
  t: LocaleType['Auth']
): { field?: Path<ForgotPasswordFormData>; message: string } => {
  const { errors } = t

  if (message.includes('User with this email')) {
    return {
      message: errors.userNotFound,
    }
  }
  if (message.includes('Recaptcha is not valid')) {
    return { message: errors.recaptchaIsNotValid }
  }

  return { message }
}
