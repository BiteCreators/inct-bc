import { cn } from '@/common/lib/utils/cn'
import { authApi } from '@/entities/auth'
import { Posts } from '@/features/posts'
import { ProfileHeader } from '@/widgets/profile-header'
import { useRouter } from 'next/router'

export default function CurrentProfile() {
  const router = useRouter()
  const { id } = router.query
  const { data } = authApi.useMeQuery()

  return (
    <div className={cn('px-[15px] md:pl-6 md:pr-16')}>
      <ProfileHeader />
      <Posts />
      Profile ID : {id}
    </div>
  )
}
