import { GithubSvgrepoCom31 } from '@/common/assets/icons/components'
import Link from 'next/link'

export const GithubOauthButton = () => {
  return (
    <Link href={'https://inctagram.work/api/v1/auth/github/login'}>
      <GithubSvgrepoCom31 height={'36px'} viewBox={'0 0 24 24'} width={'36px'} />
    </Link>
  )
}
