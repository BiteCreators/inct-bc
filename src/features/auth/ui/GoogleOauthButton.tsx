import { authApi } from '@/common/api/auth.api'
import { GoogleSvgrepoCom1 } from '@/common/assets/icons/components'
import Link from 'next/link'

export const GoogleOauthButton = () => {
  const [googleAuth] = authApi.useGoogleAuthMutation()

  const handleGoogleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL!}`
    const scope = 'email profile'
    const responseType = 'code'

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`

    // Перенаправляем пользователя на страницу авторизации Google
    window.location.href = googleAuthUrl
  }

  return (
    <Link href={''} onClick={handleGoogleLogin}>
      <GoogleSvgrepoCom1 height={'36px'} viewBox={'0 0 24 24'} width={'36px'} />
    </Link>
  )
}
