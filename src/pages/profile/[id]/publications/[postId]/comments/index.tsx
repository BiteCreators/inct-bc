import { useEffect } from 'react'

import { PostComments } from '@/features/comments/ui/PostComments'
import { useMediaQuery } from '@byte-creators/utils'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'

export default function PostCommentsPage() {
  const router = useRouter()
  const isLargeScreen = useMediaQuery('(min-width: 1024px)')
  const params = useParams()
  const id = params?.id
  const postId = params?.postId

  useEffect(() => {
    if (isLargeScreen && id && postId) {
      router.push(`/profile/${id}/publications/${postId}`)
    }
  }, [isLargeScreen, id, postId, router])

  if (isLargeScreen) {
    return null
  }

  return <PostComments />
}
