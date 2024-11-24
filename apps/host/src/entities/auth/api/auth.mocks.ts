import { HttpResponse, http } from 'msw'

export const authHanlders = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/me`, () => {
    return HttpResponse.json({
      email: 'user@gmail.com',
      isBlocked: false,
      userId: 1,
      userName: 'user',
    })
  }),
]
