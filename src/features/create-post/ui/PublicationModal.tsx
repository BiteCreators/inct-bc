import React, { ReactNode } from 'react'

import { profileApi } from '@/entities/profile'
import { SnakeGame } from '@/features/games/ui/SnakeGame'
import { LoaderBlock, ScrollArea, Slider, TextArea, UserProfile } from '@byte-creators/ui-kit'
import { useMediaQuery, useScopedTranslation } from '@byte-creators/utils'

type Props = {
  correct: boolean
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  isLoading: boolean
  limit: number
  slides: ReactNode[]
  value: string
}

export const PublicationModal = ({
  correct,
  handleChange,
  isLoading,
  limit,
  slides,
  value,
}: Props) => {
  const t = useScopedTranslation('Posts')
  const { data: profile } = profileApi.useGetProfileQuery()
  const isLargeScreen = useMediaQuery('(min-width: 768px)')

  if (isLoading && isLargeScreen) {
    return (
      <SnakeGame
        cellsClassName={'h-10 w-10'}
        fieldWidth={23}
        title={'Help the dragon catch the egg while the post is loading!'}
      />
    )
  }

  const content = (
    <div className={'md:w-1/2 p-3 md:p-6 max-h-[200px] '}>
      <div className={'mb-4 md:mb-6'}>
        {profile && (
          <UserProfile
            avatarUrl={profile.avatars[0]?.url || ''}
            isLoading={isLoading}
            profileId={profile.id}
            userName={profile.userName}
          />
        )}
      </div>
      <TextArea
        className={'max-h-[100px] md:min-h-[120px] md:max-h-[180px]'}
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
      <span className={'pb-12 md:pb-0'}>LOCATION</span>
    </div>
  )

  return (
    <div className={'flex flex-col md:flex-row'}>
      <div className={'h-auto md:w-1/2'}>
        <Slider duration={0} slides={slides} />
      </div>
      {isLargeScreen ? content : <ScrollArea>{content}</ScrollArea>}
      {isLoading && !isLargeScreen && <LoaderBlock portal />}
    </div>
  )
}
