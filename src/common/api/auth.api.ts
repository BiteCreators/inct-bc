import { inctagramApi } from './inct.api'

type RegistrationDto = {
  baseUrl: string
  email: string
  password: string
  userName: string
}

type RegistrationConfirmationDto = {
  confirmationCode: string
}

export const authApi = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    checkRecoveryCode: builder.mutation<any, { recoveryCode: string }>({
      query: body => ({
        body,
        method: 'POST',
        url: 'v1/auth/check-recovery-code',
      }),
    }),
    forgotPassword: builder.mutation<void, any>({
      query: body => ({
        body,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        url: `/v1/auth/password-recovery`,
      }),
    }),
    registration: builder.mutation<void, RegistrationDto>({
      query: body => ({
        body,
        method: 'POST',
        url: 'v1/auth/registration',
      }),
    }),
    registrationConfirmation: builder.mutation<void, RegistrationConfirmationDto>({
      query: body => ({
        body,
        method: 'POST',
        url: '/v1/auth/registration-confirmation',
      }),
    }),
  }),
})
