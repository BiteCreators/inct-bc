import { Button } from '@/common/components/button/Button'
import Link from 'next/link'

type Props = {
  className?: string
  variant?: 'primary' | 'text'
}

export const ForgotPassButton = ({ className, variant = 'text' }: Props) => {
  return (
    <Button asChild className={className} variant={variant}>
      <Link href={'/auth/forgot'}>Forgot Password</Link>
    </Button>
  )
}
