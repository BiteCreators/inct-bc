import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import { Button } from '@/common/ui'
import Link from 'next/link'

type Props = {
  variant?: 'primary' | 'text'
}

export const SignInButton = ({ variant = 'text' }: Props) => {
  const t = useScopedTranslation('Auth')

  return (
    <>
      <Button asChild className={'mx-auto mt-1'} variant={variant}>
        <Link className={'text-center'} href={'/auth/sign-in'}>
          {t.signIn}
        </Link>
      </Button>
    </>
  )
}
