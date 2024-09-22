import React from 'react'

import { Button } from '@/common/components/button/Button'
import { Card } from '@/common/components/card/Card'
import Typography from '@/common/components/typography/Typography'
import Image from 'next/image'

export const LinkExpiredForm = () => {
  return (
    <Card
      className={
        ' bg-transparent p-6 flex flex-col gap-6 max-w-[340px] w-screen border-0 items-center'
      }
    >
      <Typography variant={'h1'}>Email verification link expired</Typography>
      <Typography className={'text-center'} variant={'regular-text'}>
        Looks like the verification link has expired. Not to worry, we can send the link again
      </Typography>
      <Button className={'w-full'}>Resend Link</Button>
      <Image alt={'image'} height={300} src={'/images/rafiki2.png'} width={500} />
    </Card>
  )
}
