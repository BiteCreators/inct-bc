import React from 'react'

import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import { Typography } from '@/common/ui'
import Image from 'next/image'

type Props = {
  button?: React.ReactNode
}

export const LinkExpiredWrapper = ({ button }: Props) => {
  const t = useScopedTranslation('Auth')

  return (
    <div className={'flex flex-col items-center'}>
      <div className={'flex flex-col w-screen max-w-[310px] text-center'}>
        <Typography variant={'h2'}>{t.verificationLinkExpired}</Typography>
        <Typography className={'mt-[19px] mb-[30px]'} variant={'regular-text'}>
          {t.verificationLinkExpiredBody}
        </Typography>
        {button}
      </div>
      <Image
        alt={'image'}
        className={'max-w-[473px] mt-8'}
        height={353}
        layout={'responsive'}
        src={'/images/rafiki.svg'}
        width={473}
      />
    </div>
  )
}
