import React from 'react'

import { useMediaQuery } from '@/common/lib/hooks/useMediaQuery'
import { Post } from '@/entities/posts'
import { PostDetails } from '@/widgets/post-details'
import { ProfileHeader } from '@/widgets/profile-header'

import exampleAvatar from '../../../../../../public/examples/0a9f264bc73447e3ce0157c47fae210a (1).jpg'

type Props = {
  post: Post
}

export const SinglePostPage = ({ post }: Props) => {
  const isLargeScreen = useMediaQuery('(min-width: 768px)')

  return (
    <div>
      {isLargeScreen && <ProfileHeader />}
      <PostDetails post={post} />
    </div>
  )
}
