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

type Login = {
  baseUrl: string
  email: string
  password: string
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
