import React from 'react'

import { UserProfile, profileApi } from '@/entities/profile'
import { Slider, TextArea, Loader } from '@byte-creators/ui-kit'
import { useScopedTranslation } from '@byte-creators/utils'

import { ImageData } from '../types'
import { generateTotalImageSlides } from './ImageSlides'

type Props = {
  correct: boolean
  isLoading: boolean
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  images: ImageData[]
  limit: number
  value: string
}

export const PublicationModal = ({
  correct,
  handleChange,
  images,
  limit,
  value,
  isLoading,
}: Props) => {
  const totalImageSlides = generateTotalImageSlides(images)
  const t = useScopedTranslation('Posts')
  const { data: profile } = profileApi.useGetProfileQuery()

  return (
    <div className={'flex'}>
      {isLoading && (
        <div className={'absolute top-2 right-10 w-16 h-12 flex justify-center bg-dark-300'}>
          <Loader />
        </div>
      )}
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
          placeholder={'Type here...'}
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
