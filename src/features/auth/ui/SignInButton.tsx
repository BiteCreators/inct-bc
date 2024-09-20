import { Button } from '@/common/components/button/Button'
import { useScopedTranslation } from '@/common/utils/hooks/useTranslation'
import Link from 'next/link'

export const SignInButton = () => {
  const t = useScopedTranslation('Auth')

  return (
    <Button asChild variant={'text'}>
      <Link className={'text-center'} href={'/auth/sign-in'}>
        {t.signIn}
      </Link>
    </Button>
  )
}
