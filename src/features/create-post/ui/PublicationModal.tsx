import React, { ReactNode } from 'react'

import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import { TextArea } from '@/common/ui'
import { Slider } from '@/common/ui/slider/Slider'
import { UserProfile, profileApi } from '@/entities/profile'

type Props = {
  handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  slides: ReactNode[]
}

export const PublicationModal = ({ handleDescriptionChange, slides }: Props) => {
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
