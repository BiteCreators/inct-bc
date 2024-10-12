import { Button, Typography } from '@/common/ui'
import { AboutUser, ProfileFollowButton } from '@/features/profile'
import Link from 'next/link'
import { useParams } from 'next/navigation'
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

  return (
    <>
      <div className={'flex items-center sm:items-start gap-7 sm:gap-9 mb-2 sm:mb-12'}>
        <div className="self-start">
          <Link href={''} className="">
            <div className="w-20 sm:w-36 lg:!w-52">
              <img
                src={exampleImage.src}
                alt="Avatar"
                className="rounded-full object-cover w-full h-full"
              />
            </div>
          </Link>
        </div>
        <div className={'flex-1 text-white'}>
          <div className={'hidden justify-between mb-5 sm:flex gap-5'}>
            <Typography variant="h1" className="whitespace-nowrap overflow-hidden text-ellipsis">
              {username}
            </Typography>
            <Button asChild variant={'secondary'} className="hidden md:flex text-center">
              <Link href={`/profile/${id}/settings`}>Profile Settings</Link>
            </Button>
          </div>
          <div className={'flex gap-5 sm:gap-9 lg:!gap-20 text-sm sm:mb-5'}>
            <ProfileFollowButton count={followingCount} label={'Following'} href={`#`} />
            <ProfileFollowButton count={followersCount} label={'Followers'} href={`#`} />
            <div className={'flex flex-col text-xs sm:text-sm'}>
              <span className={'font-weight700'}>{publications}</span>
              <span>Publications</span>
            </div>
          </div>
          <AboutUser text={aboutUser} className="hidden sm:flex text-left" />
        </div>
      </div>
      <div>
        <Typography variant="regular-text" className="sm:hidden font-weight700 mb-3">
          {username}
        </Typography>
        <AboutUser text={aboutUser} className="flex sm:hidden text-left text-sm" />
      </div>
    </>
  )
}
