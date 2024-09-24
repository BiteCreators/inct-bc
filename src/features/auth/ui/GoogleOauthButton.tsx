import { GoogleSvgrepoCom1 } from '@/common/assets/icons/components'
import Link from 'next/link'

export const GoogleOauthButton = () => {
  return (
    <Link href={'#'}>
      <GoogleSvgrepoCom1 height={'36px'} viewBox={'0 0 24 24'} width={'36px'} />
    </Link>
  )
}
