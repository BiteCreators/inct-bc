import { useSignInForm } from '@/features/auth/model/useSignInForm'
import { Button } from '@packages/shared/ui'
import Link from 'next/link'

type Props = {
  className?: string
  variant?: 'primary' | 'text'
}

export const ForgotPassButton = ({ className, variant = 'text' }: Props) => {
  const { t } = useSignInForm()

  return (
    <Button asChild className={className} variant={variant}>
      <Link href={'/auth/forgot-password'}>{t.forgotPassword}</Link>
    </Button>
  )
}
