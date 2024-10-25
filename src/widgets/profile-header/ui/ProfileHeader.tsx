import { useState } from 'react'

import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import { Button, Typography } from '@/common/ui'
import { EditPost } from '@/features/edit-post'
import { AboutUser, ProfileFollowButton } from '@/features/profile'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'

import exampleImage from '../../../../public/examples/exampleAvatar.png'

export const ProfileHeader = () => {
  const username = 'URLProfiele'
  const publications = '345'
  const followingCount = 2218
  const followersCount = 234
  const aboutUser =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  const params = useParams<{ id: string }>()
  const id = params?.id
  const router = useRouter()
  const locale = router.locale === 'en' ? 'en' : 'ru'
  const t = useScopedTranslation('Profile')
  const [editMode, setEditMode] = useState(false)
  const tNav = useScopedTranslation('Navigation')

  return (
    <>
      <div className={'flex items-center sm:items-start gap-5 sm:gap-7 md:!gap-9 mb-2 sm:mb-12'}>
        <div className={'self-start'}>
          <Link className={''} href={''}>
            <div className={'w-20 sm:w-36 lg:!w-52'}>
              <img
                alt={'Avatar'}
                className={'rounded-full object-cover w-full h-full'}
                src={exampleImage.src}
              />
            </div>
          </Link>
        </div>
        <div className={'flex-1 text-white'}>
          <div className={'hidden justify-between mb-5 sm:flex gap-5'}>
            <Typography
              className={'whitespace-nowrap overflow-hidden text-ellipsis'}
              variant={'h1'}
            >
              {username}
            </Typography>
            <EditPost changeOpen={setEditMode} isOpen={editMode} />
            <Button onClick={() => setEditMode(true)}>Open</Button>
            <Button asChild className={'hidden md:flex text-center'} variant={'secondary'}>
              <Link href={`/profile/${id}/settings`}>{tNav.profileSettings}</Link>
            </Button>
          </div>
          <div className={'flex gap-5 sm:gap-7 lg:!gap-20 text-sm sm:mb-5'}>
            <ProfileFollowButton
              count={followingCount}
              href={`#`}
              label={t.following}
              locale={locale}
            />
            <ProfileFollowButton
              count={followersCount}
              href={`#`}
              label={t.followers}
              locale={locale}
            />
            <div className={'flex flex-col text-xs sm:text-sm'}>
              <span className={'font-weight700'}>{publications}</span>
              <span>{t.publications}</span>
            </div>
          </div>
          <AboutUser className={'hidden sm:flex text-left'} text={aboutUser} />
        </div>
      </div>
      <div>
        <Typography className={'sm:hidden font-weight700 mb-3'} variant={'regular-text'}>
          {username}
        </Typography>
        <AboutUser className={'flex sm:hidden text-left text-sm'} text={aboutUser} />
      </div>
    </>
  )
}
