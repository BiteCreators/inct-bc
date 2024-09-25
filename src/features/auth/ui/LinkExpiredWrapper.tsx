import React from 'react'

import { Card } from '@/common/components/card/Card'
import Typography from '@/common/components/typography/Typography'
import Image from 'next/image'

type Props = {
  children: React.ReactNode
}

export const LinkExpiredWrapper = ({ children }: Props) => {
  return (
    <div className={'flex flex-col items-center'}>
      <div className={'  p-6 flex flex-col gap-6 max-w-[340px] w-screen  items-center'}>
        <Typography variant={'h1'}>Email verification link expired</Typography>
        <Typography className={'text-center'} variant={'regular-text'}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </Typography>
        {children}
      </div>
      <Image
        alt={'image'}
        height={353}
        layout={'responsive'}
        src={'/images/rafiki.svg'}
        width={473}
      />
    </div>
  )
}
