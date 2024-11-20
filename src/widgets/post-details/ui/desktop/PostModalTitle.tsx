import React from 'react'

import { cn } from '@/common/lib/utils/cn'
import { authApi } from '@/entities/auth'
import { Post } from '@/entities/posts'
import { Profile } from '@/entities/profile'
import { DropdownPost } from '@/features/posts/ui/DropdownPost'
import { PostOwnerProfile } from '@/features/posts/ui/PostOwnerProfile'
import * as Dialog from '@radix-ui/react-dialog'

type Props = {
  changeEditMode: (e: boolean) => void
  post: Post
  profile: Profile
}
export const PostModalTitle = ({ changeEditMode, post, profile }: Props) => {
  const { data: currentUser } = authApi.useMeQuery()
  const isMyPost = post.ownerId === currentUser?.userId || false

  return (
    <Dialog.Title className={cn('font-bold py-3 px-6')}>
      <div className={'flex justify-between w-full'}>
        <PostOwnerProfile post={post} />
        <DropdownPost
          changeEditMode={changeEditMode}
          className={'z-50'}
          currentUser={currentUser}
          isMyPost={isMyPost}
          post={post}
          profile={profile}
        />
      </div>
    </Dialog.Title>
  )
}
