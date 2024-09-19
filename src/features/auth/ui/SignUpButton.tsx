import { Button } from '@/common/components/button/Button'
import Link from 'next/link'

type Props = {
  variant?: 'primary' | 'text'
}

export const SignUpButton = ({ variant = 'text' }: Props) => {
  return (
    <Button asChild className={'mx-auto'} variant={variant}>
      <Link href={'/auth/sign-up'}>Sing Up</Link>
    </Button>
  )
}
