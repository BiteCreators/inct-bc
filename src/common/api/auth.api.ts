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
