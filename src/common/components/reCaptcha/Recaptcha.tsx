import React from 'react'

import Recaptchalogo1 from '@/common/assets/icons/components/Recaptchalogo1'
import { Checkbox } from '@/common/components/checkbox/Checkbox'

export const Recaptcha = () => {
  return (
    <div
      className={'max-w-[300px] bg-dark-500 w-full h-20 flex flex-row items-center justify-around'}
    >
      <Checkbox />
      <Recaptchalogo1 height={50} width={50} />
    </div>
  )
}
