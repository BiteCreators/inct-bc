import React, { ReactNode } from 'react'

import { cn } from '@/common/lib/utils/cn'
import { Avatar, TextArea, Typography } from '@/common/ui'
import { Slider } from '@/common/ui/slider/Slider'

import exampleImage from '../../../../public/examples/image2.png'

type Props = {
  handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  slides: ReactNode[]
}

export const PublicationModal = ({ handleDescriptionChange, slides }: Props) => {
  return (
    <div className={'flex'}>
      <div className={'w-1/2'}>
        <Slider duration={0} slides={slides} />
      </div>
      <div className={'w-1/2 p-6'}>
        <UserProfileUrl className={'mb-6'} />
        <TextArea
          className={'min-h-[120px]'}
          label={'Add publication descriptions'}
          onChange={handleDescriptionChange}
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
