import React from 'react'

import { useMediaQuery } from '@/common/lib/hooks/useMediaQuery'
import { Post } from '@/entities/posts'
import { PostDetailsModal } from '@/features/posts/ui/PostDetailsModal'
import { ProfileHeader } from '@/widgets/profile-header'

type Props = {
  post: Post
}

export const SinglePostPage = ({ post }: Props) => {
  const isLargeScreen = useMediaQuery('(min-width: 768px)')

  return (
    <div>
      {isLargeScreen && <ProfileHeader />}
      <PostDetailsModal post={post} />
    </div>
  )
}
