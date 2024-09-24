import React from 'react'

import { authApi } from '@/common/api/auth.api'
import { Button } from '@/common/components/button/Button'
import { Card } from '@/common/components/card/Card'
import Typography from '@/common/components/typography/Typography'
import Image from 'next/image'
import { useRouter } from 'next/router'

export const LinkExpiredWrapper = ({
  ButtonNameVariant,
}: {
  ButtonNameVariant: 'long' | 'short'
}) => {
  const router = useRouter()
  const { code, email } = router.query

  console.log(email)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!
  const [forgotPassword] = authApi.useForgotPasswordMutation()
  const handler = () => {
    const data = {}

    forgotPassword(data).unwrap()
  }

  return (
    <div className={'flex flex-col items-center'}>
      <Card
        className={
          ' bg-transparent p-6 flex flex-col gap-6 max-w-[340px] w-screen border-0 items-center'
        }
      >
        <Typography variant={'h1'}>Email verification link expired</Typography>
        <Typography className={'text-center'} variant={'regular-text'}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </Typography>
        <Button onClick={() => handler()} type={'button'}>
          Create new password
        </Button>
      </Card>
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
