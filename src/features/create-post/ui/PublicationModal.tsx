import React, { ReactNode, useEffect, useState } from 'react'

import { profileApi } from '@/entities/profile'
import { SnakeGame } from '@/features/games/ui/SnakeGame'
import {
  Alert,
  Button,
  LoaderBlock,
  ScrollArea,
  Slider,
  TextArea,
  UserProfile,
} from '@byte-creators/ui-kit'
import { useMediaQuery, useScopedTranslation } from '@byte-creators/utils'
import { useRouter } from 'next/router'

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

  const [isPublishing, setIsPublishing] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)

  const router = useRouter()

  useEffect(() => {
    if (isLoading) {
      setIsPublishing(true)
    } else {
      setIsPublishing(false)
    }
  }, [isLoading])

  const handleRedirect = () => {
    if (isRedirecting) {
      return
    }

    setIsRedirecting(true)
    router.push('/profile/1431')
  }

  const renderMobileLoading = () => <LoaderBlock portal />

  const renderDesktopLoading = () => (
    <SnakeGame
      cellsClassName={'h-10 w-10'}
      fieldWidth={23}
      title={'Help the dragon catch the egg while the post is loading!'}
    />
  )

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

  if (isPublishing) {
    return isLargeScreen ? renderDesktopLoading() : renderMobileLoading()
  }

  return (
    <div className={'flex flex-col md:flex-row'}>
      <div className={'h-auto md:w-1/2'}>
        <Slider duration={0} slides={slides} />
      </div>
      {isLargeScreen ? content : <ScrollArea>{content}</ScrollArea>}
      {isLoading && !isLargeScreen && <LoaderBlock portal />}

      <div className={'my-4'}>
        <Alert message={`isLoading: ${isLoading}`} type={'info'} />
        <Alert message={`isPublishing: ${isPublishing}`} type={'info'} />
        <Alert message={`isRedirecting: ${isRedirecting}`} type={'info'} />
      </div>

      <div className={'mt-5'}>
        <Button onClick={handleRedirect} variant={'primary'}>
          Go to profile
        </Button>
      </div>
    </div>
  )
}
