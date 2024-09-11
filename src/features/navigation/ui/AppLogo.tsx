import Link from 'next/link'

export const AppLogo = () => {
  //TODO: rewrite with next intl link
  return (
    <Link className={'text-xxl font-weight600'} href={'/'}>
      Inctagram
    </Link>
  )
}
