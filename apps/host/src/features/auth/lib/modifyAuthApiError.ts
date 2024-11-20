import { Path } from 'react-hook-form'

import { LocaleType } from '@/locales/en'

import { SignUpFormData } from './schemas/signUp.schema'

export const modifySignUpApiError = (
  message: string,
  t: LocaleType['Auth']
): { field?: Path<SignUpFormData>; message: string } => {
  const { errors } = t

  if (message.includes('already exist') && message.includes('userName')) {
    return {
      message: errors.usernameTakenError,
    }
  }
  if (message.includes('already exist') && message.includes('email')) {
    return {
      message: errors.emailTakenError,
    }
  }

  if (message.includes('User with this email')) {
    return {
      message: errors.userNotFound,
    }
  }
  if (message.includes("Email isn't valid or already confirmed")) {
    return {
      message: errors.emailIsNotValidOrAlreadyConfirmedError,
    }
  }

  return { message }
}
