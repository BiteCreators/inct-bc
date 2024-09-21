import React, { ComponentProps } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import styles from './recaptcha.module.css'

type Recaptcha = ComponentProps<typeof ReCAPTCHA>
console.log(styles)
export const Recaptcha = ({ ...props }: Recaptcha) => {
  return (
    <div className={styles.recaptchaContainer}>
      <ReCAPTCHA {...props} />
    </div>
  )
}
