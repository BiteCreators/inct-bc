import { Button } from '@/common/components/button/Button'
import { useScopedTranslation } from '@/common/utils/hooks/useTranslation'
import Link from 'next/link'

type Props = {
  variant?: 'primary' | 'text'
}

export const SignInButton = ({ variant = 'text' }: Props) => {
  const t = useScopedTranslation('Auth')

  return (
    <Button asChild variant={variant}>
      <Link className={'text-center'} href={'/auth/sign-in'}>
        {t.signIn}
      </Link>
    </Button>
  )
}
