import Link from 'next/link'

import { useScopedTranslation } from '../../../../../../packages/shared/src/hooks'
import { Button } from '../../../../../../packages/shared/src/ui'

type Props = {
  variant?: 'primary' | 'text'
}

export const SignInButton = ({ variant = 'text' }: Props) => {
  const t = useScopedTranslation('Auth')

  return (
    <>
      <Button asChild className={'mx-auto'} variant={variant}>
        <Link className={'text-center'} href={'/auth/sign-in'}>
          {t.signIn}
        </Link>
      </Button>
    </>
  )
}
