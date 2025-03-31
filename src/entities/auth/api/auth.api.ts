import { authBaseQuery, createReauthBaseQuery } from '@/common/api/base-queries'
import { inctagramApi } from '@/common/api/inct.api'

// Типы запросов
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

export type MeResponse = {
  email: string
  isBlocked: boolean
  userId: number
  userName: string
}

type RegistrationEmailResendingRequest = {
  baseUrl: string
  email: string
}

type GoogleAuthResponse = {
  accessToken: string
  email: string
}

export const authApi = inctagramApi.injectEndpoints({
  endpoints: (builder: any) => ({
    checkRecoveryCode: builder.mutation<void, CheckRecoveryCodeRequest>({
      query: body => ({
        baseQuery: createReauthBaseQuery(authBaseQuery),
        body,
        method: 'POST',
        url: '/auth/check-recovery-code',
      }),
    }),
    forgotPassword: builder.mutation<void, ForgotPasswordRequest>({
      query: body => ({
        baseQuery: createReauthBaseQuery(authBaseQuery),
        body,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        url: '/auth/password-recovery',
      }),
    }),
    googleAuth: builder.mutation<GoogleAuthResponse, { code: string }>({
      query: body => ({
        baseQuery: createReauthBaseQuery(authBaseQuery),
        body,
        method: 'POST',
        url: '/auth/google/login',
      }),
    }),
    login: builder.mutation<{ accessToken: string }, LoginRequest>({
      invalidatesTags: ['Me'],
      query: body => ({
        body,
        method: 'POST',
        url: 'v1/auth/login',
      }),
    }),
    // @ts-ignore
    logout: builder.mutation<void, void>({
      invalidatesTags: ['Me'],
      query: () => ({
        baseQuery: createReauthBaseQuery(authBaseQuery),
        method: 'POST',
        url: '/auth/logout',
      }),
    }),
    // @ts-ignore
    me: builder.query<MeResponse, void>({
      providesTags: ['Me'],
      query: () => ({
        baseQuery: createReauthBaseQuery(authBaseQuery),
        method: 'GET',
        url: '/auth/me',
      }),
    }),
    // @ts-ignore
    newPassword: builder.mutation<void, NewPasswordRequest>({
      query: body => ({
        baseQuery: createReauthBaseQuery(authBaseQuery),
        body,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        url: '/auth/new-password',
      }),
    }),
    // @ts-ignore
    registration: builder.mutation<void, RegistrationRequest>({
      query: body => ({
        baseQuery: createReauthBaseQuery(authBaseQuery),
        body,
        method: 'POST',
        url: '/auth/registration',
      }),
    }),
    // @ts-ignore
    registrationConfirmation: builder.mutation<void, RegistrationConfirmationRequest>({
      query: body => ({
        baseQuery: createReauthBaseQuery(authBaseQuery),
        body,
        method: 'POST',
        url: '/auth/registration-confirmation',
      }),
    }),
    // @ts-ignore
    registrationEmailResending: builder.mutation<void, RegistrationEmailResendingRequest>({
      query: body => ({
        baseQuery: createReauthBaseQuery(authBaseQuery),
        body,
        method: 'POST',
        url: '/auth/registration-email-resending',
      }),
    }),
  }),
})
