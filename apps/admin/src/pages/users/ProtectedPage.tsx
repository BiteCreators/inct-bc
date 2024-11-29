import { useEffect } from 'react'

import { useAuth } from '@/application/providers/AuthProvider'
import { CurrentUser } from '@/features/users/current-user/ui/CurrentUser'
import { useRouter } from 'next/router'

const ProtectedPage = () => {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated === null) {
      return
    }

    if (!isAuthenticated) {
      router.push('/auth/sign-in')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div>
      <h1>Users page</h1>
      <CurrentUser />
    </div>
  )
}

export default ProtectedPage
