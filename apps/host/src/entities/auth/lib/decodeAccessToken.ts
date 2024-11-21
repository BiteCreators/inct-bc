import * as jose from 'jose'

export const decodeAccessToken = (accessToken: string) => {
  try {
    const data = jose.decodeJwt(accessToken)

    if ('userId' in data && typeof data.userId === 'number') {
      return {
        userId: data.userId,
      }
    }

    return {}
  } catch (error) {
    return {}
  }
}
