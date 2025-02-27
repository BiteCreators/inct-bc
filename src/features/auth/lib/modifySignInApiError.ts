import { Path } from 'react-hook-form'

import { LocaleType } from '@byte-creators/utils'

import { SignInFormData } from './schemas/signIn.schema'

export const modifySingInApiError = (
  message: string,
  t: LocaleType['Auth']
): { field?: Path<SignInFormData>; message: string } => {
  const { errors } = t

  if (message.includes('invalid password or email')) {
    return { field: 'password', message: errors.emailOrPasswordError }
  }

  return { message }
}
