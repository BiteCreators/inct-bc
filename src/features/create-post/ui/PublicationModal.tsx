import React, {ReactNode} from 'react'

import { UserProfile, profileApi } from '@/entities/profile'
import {LoaderBlock, Slider, TextArea} from '@byte-creators/ui-kit'
import { useScopedTranslation } from '@byte-creators/utils'

import { ImageData } from '../types'

type Props = {
  correct: boolean
  isLoading: boolean
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  images: ImageData[]
  limit: number
  value: string
  slides: ReactNode[]
}

export const PublicationModal = ({
  correct,
  handleChange,
  limit,
  value,
  isLoading,
  slides
}: Props) => {
  const t = useScopedTranslation('Posts')
  const { data: profile } = profileApi.useGetProfileQuery()

  return (
    <div className={'flex'}>
      <div className={'w-1/2'}>
        <Slider duration={0} slides={slides} />
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
      { isLoading && <LoaderBlock /> }
    </div>
  )
}
