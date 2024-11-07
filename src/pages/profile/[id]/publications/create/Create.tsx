import { useMediaQuery } from '@/common/lib/hooks/useMediaQuery'
import { Loader } from '@/common/ui'
import { profileApi } from '@/entities/profile'
import { CreatePostModal } from '@/features/create-post/ui/CreatePostModal'
import { Posts } from '@/features/posts'
import { ProfileHeader } from '@/widgets/profile-header'

export default function Create() {
  const isLargeScreen = useMediaQuery('(min-width: 768px)')
  const { data: profile, isLoading, isSuccess } = profileApi.useGetProfileQuery()

  return (
    <div className={'px-[15px] md:pl-6 md:pr-16'}>
      {isLoading && <Loader fullScreen />}
      {isLargeScreen && isSuccess && (
        <>
          <ProfileHeader profile={profile} />
          <Posts userId={profile.id} />
        </>
      )}
      <CreatePostModal />
    </div>
  )
}
