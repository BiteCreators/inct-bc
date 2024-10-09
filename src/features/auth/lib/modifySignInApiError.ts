import { Path } from 'react-hook-form'

import { LocaleType } from '@/locales/en'

import { SignInFormData } from './schemas/signIn.schema'

export const modifySingInApiError = (
  message: string,
  t: LocaleType['Auth']
): { field?: Path<SignInFormData>; message: string } => {
  if (message.includes('invalid password or email')) {
    return { field: 'password', message: t.emailOrPasswordError }
  }

  return { message }
}
