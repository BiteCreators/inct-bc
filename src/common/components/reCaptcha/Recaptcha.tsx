import React, { ComponentProps } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import { cn } from '@/common/utils/cn'
import { useRouter } from 'next/router'

import styles from './recaptcha.module.css'

type Props = ComponentProps<typeof ReCAPTCHA>

export const Recaptcha = ({ ...props }: Props) => {
  const { locale } = useRouter()

  return (
    <div className={cn(styles.recaptchaContainer, props.className)}>
      <ReCAPTCHA hl={locale} {...props} />
    </div>
  )
}
