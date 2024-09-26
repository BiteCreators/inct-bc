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

type CheckRecoveryCodeRequest = {
  recoveryCode: string
}

type ForgotPasswordRequest = {
  baseUrl: string
  email: string
  recaptcha: string
}

type NewPasswordRequest = {
  newPassword: string
  recoveryCode: string
}

type Login = {
  baseUrl: string
  email: string
  password: string
}

type RegistrationEmailResendingDto = {
  baseUrl: string
  email: string

}

export const authApi = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<void, Login>({
      query: body => ({
        body,
        method: 'POST',
        url: '/v1/auth/login',
      }),
    }),
    checkRecoveryCode: builder.mutation<void, CheckRecoveryCodeRequest>({
      query: body => ({
        body,
        method: 'POST',
        url: 'v1/auth/check-recovery-code',
      }),
    }),
    forgotPassword: builder.mutation<void, ForgotPasswordRequest>({
      query: body => ({
        body,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        url: `/v1/auth/password-recovery`,
      }),
    }),
    newPassword: builder.mutation<void, NewPasswordRequest>({
      query: body => ({
        body,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        url: `/v1/auth/new-password`,
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
    registrationEmailResending: builder.mutation<void, RegistrationEmailResendingDto>({
      query: body => ({
        body,
        method: 'POST',
        url: '/v1/auth/registration-email-resending',
      }),
    }),
  }),
})
