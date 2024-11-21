import React from 'react'

import { UserProfile, profileApi } from '@/entities/profile'
import { useScopedTranslation } from '@packages/shared/hooks/useTranslation'
import { TextArea } from '@packages/shared/ui'
import { Slider } from '@packages/shared/ui/slider/Slider'

import { ImageData } from '../types'
import { generateTotalImageSlides } from './ImageSlides'

type Props = {
  correct: boolean
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  images: ImageData[]
  limit: number
  value: string
}

export const PublicationModal = ({ correct, handleChange, images, limit, value }: Props) => {
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
          className={'min-h-[120px] max-h-[180px]'}
          isCorrect={correct}
          label={t.addPublicationDesctiption}
          limitCount={limit}
          onChange={handleChange}
          placeholder={'Text-area'}
          value={value}
        />
        <div className={'flex mx-[-24px] mt-5 mb-6'}>
          <div className={'h-px bg-dark-100 w-full'} />
        </div>
        <span>LOCATION</span>
      </div>
    </div>
  )
}
