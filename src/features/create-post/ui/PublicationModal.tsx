import React from 'react'

import { cn } from '@/common/lib/utils/cn'
import { Avatar, TextArea, Typography } from '@/common/ui'

import exampleImage from '../../../../public/examples/image2.png'

export const PublicationModal = () => {
  return (
    <div className={'h-[504px] flex'}>
      <div className={'w-1/2'}>
        <img alt={'oops'} className={'w-full h-full'} src={exampleImage.src} />
      </div>
      <div className={'w-1/2 p-6'}>
        <UserProfileUrl className={'mb-6'} />
        <TextArea
          className={'min-h-[120px]'}
          counter={500}
          label={'Add publication descriptions'}
          placeholder={'Text-area'}
        />
        <div className={'flex mx-[-24px] mt-5 mb-6'}>
          <div className={'h-px bg-dark-100 w-full'} />
        </div>
        <span>LOCATION</span>
      </div>
    </div>
  )
}

const UserProfileUrl = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className={'w-9 h-9'}>
        <Avatar avatarURL={exampleImage.src} />
      </div>
      <Typography className={'font-medium'}>URLProfile</Typography>
    </div>
  )
}
