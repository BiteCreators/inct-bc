import { http } from 'msw'

export const handlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/me`, () => {
    console.log('ME REQUEST')
  }),
]
