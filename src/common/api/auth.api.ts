import { inctagramApi } from './inct.api'

type RegistrationRequest = {
  baseUrl: string
  email: string
  password: string
  userName: string
}

type RegistrationConfirmationRequest = {
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

type LoginRequest = {
  baseUrl: string
  email: string
  password: string
}

type MeResponse = {
  email: string
  isBlocked: boolean
  userId: number
  userName: string
}

type RegistrationEmailResendingRequest = {
  baseUrl: string
  email: string
}

export const authApi = inctagramApi.injectEndpoints({
  endpoints: builder => ({
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
    login: builder.mutation<{ accessToken: string }, LoginRequest>({
      invalidatesTags: ['Me'],
      query: body => ({
        body,
        method: 'POST',
        url: '/v1/auth/login',
      }),
    }),
    logout: builder.mutation<void, { baseUrl: string }>({
      invalidatesTags: ['Me'],
      query: body => ({
        body,
        method: 'POST',
        url: '/v1/auth/logout',
      }),
    }),
    me: builder.query<MeResponse, void>({
      providesTags: ['Me'],
      query: body => ({
        body,
        method: 'GET',
        url: '/v1/auth/me',
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
    registration: builder.mutation<void, RegistrationRequest>({
      query: body => ({
        body,
        method: 'POST',
        url: 'v1/auth/registration',
      }),
    }),
    registrationConfirmation: builder.mutation<void, RegistrationConfirmationRequest>({
      query: body => ({
        body,
        method: 'POST',
        url: '/v1/auth/registration-confirmation',
      }),
    }),
    registrationEmailResending: builder.mutation<void, RegistrationEmailResendingRequest>({
      query: body => ({
        body,
        method: 'POST',
        url: '/v1/auth/registration-email-resending',
      }),
    }),
  }),
})
