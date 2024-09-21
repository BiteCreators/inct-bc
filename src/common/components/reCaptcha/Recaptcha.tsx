import React, { ComponentProps } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import { useRouter } from 'next/router'

import styles from './recaptcha.module.css'

type Props = ComponentProps<typeof ReCAPTCHA>

export const Recaptcha = ({ ...props }: Props) => {
  const { locale } = useRouter()

  return (
    <div className={styles.recaptchaContainer}>
      <ReCAPTCHA hl={locale} {...props} />
    </div>
  )
}
