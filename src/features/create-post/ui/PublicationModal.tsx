import React from 'react'

import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import { TextArea } from '@/common/ui'
import { Slider } from '@/common/ui/slider/Slider'
import { UserProfile, profileApi } from '@/entities/profile'

import exampleImage from '../../../../public/examples/image2.png'
import { ImageData } from '../types'
import { generateTotalImageSlides } from './ImageSlides'

type Props = {
  handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  images: ImageData[]
}

export const PublicationModal = ({ handleDescriptionChange, images }: Props) => {
  const totalImageSlides = generateTotalImageSlides(images)
  const t = useScopedTranslation('Posts')
  const { data: profile } = profileApi.useGetProfileQuery()

  return (
    <div className={'flex'}>
      <div className={'w-1/2'}>
        <Slider duration={0} slides={totalImageSlides} />
      </div>
      <div className={'w-1/2 p-6'}>
        <div className={'mb-6'}>
          {profile && (
            <UserProfile
              avatarUrl={profile.avatars[0]?.url || ''}
              profileId={profile.id}
              userName={profile.userName}
            />
          )}
        </div>
        <TextArea
          className={'min-h-[120px]'}
          label={t.addPublicationDesctiption}
          limitCount={500}
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
