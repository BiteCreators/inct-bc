import React from 'react'

import { authApi } from '@/entities/auth'
import { Post } from '@/entities/posts'
import { DropdownPost } from '@/features/posts/ui/DropdownPost'
import { PostOwnerProfile } from '@/features/posts/ui/PostOwnerProfile'
import { cn } from '@packages/shared/utils/cn'
import * as Dialog from '@radix-ui/react-dialog'

type Props = {
  changeEditMode: (e: boolean) => void
  post: Post
}
export const PostModalTitle = ({ changeEditMode, post }: Props) => {
  const { data } = authApi.useMeQuery()
  const isMyPost = post.ownerId === data?.userId || false

  return (
    <Dialog.Title className={cn('font-bold py-3 px-6')}>
      <div className={'flex justify-between w-full'}>
        <PostOwnerProfile post={post} />
        <DropdownPost
          changeEditMode={changeEditMode}
          className={'z-50'}
          isMyPost={isMyPost}
          post={post}
        />
      </div>
    </Dialog.Title>
  )
}
