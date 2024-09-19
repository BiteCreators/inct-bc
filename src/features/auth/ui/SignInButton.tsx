import { Button } from '@/common/components/button/Button'
import Link from 'next/link'

export const SignInButton = () => {
  return (
    <Button asChild variant={'text'}>
      <Link className={'mx-auto'} href={'/auth/sign-in'}>
        Sign in
      </Link>
    </Button>
  )
}
