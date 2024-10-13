import { authApi } from '@/common/api/auth.api'
import { cn } from '@/common/lib/utils/cn'
import { ProfileHeader } from '@/widgets/profile-header'
import { useRouter } from 'next/router'

export default function CurrentProfile() {
  const router = useRouter()
  const { id } = router.query
  const { data } = authApi.useMeQuery()

  return (
    <div className={cn('pl-6 pr-16')}>
      <ProfileHeader />
      Profile ID : {id}
    </div>
  )
}
