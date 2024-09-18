import { Button } from '@/common/components/button/Button'
import Link from 'next/link'

type Props = {
  variant?: 'primary' | 'text'
}

export const SignUpButton = ({ variant = 'primary' }: Props) => {
  return (
    <Button asChild variant={variant}>
      <Link href={'/auth/sign-up'}>Sing Up</Link>
    </Button>
  )
}
