import { Path } from 'react-hook-form'

import { LocaleType } from '@/locales/en'

import { SignUpFormData } from './schemas/signUp.schema'

export const modifyAuthApiError = (
  message: string,
  t: LocaleType['Auth']
): { field?: Path<SignUpFormData>; message: string } => {
  if (message.includes('already exist') && message.includes('userName')) {
    return {
      message: t.usernameTakenError,
    }
  }
  if (message.includes('already exist') && message.includes('email')) {
    return {
      message: t.emailTakenError,
    }
  }

  if (message.includes('User with this email')) {
    return {
      message: t.userNotFound,
    }
  }
  if (message.includes("Email isn't valid or already confirmed")) {
    return {
      message: t.emailIsNotValidOrAlreadyConfirmedError,
    }
  }

  return { message }
}
