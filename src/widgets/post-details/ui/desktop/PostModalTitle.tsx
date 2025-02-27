import React from 'react'

import { authApi } from '@/entities/auth'
import { Post } from '@/entities/posts'
import { DropdownPost } from '@/features/posts/ui/DropdownPost'
import { PostOwnerProfile } from '@/features/posts/ui/PostOwnerProfile'
import { cn } from '@byte-creators/utils'
import * as Dialog from '@radix-ui/react-dialog'

type Props = {
  changeEditMode: (e: boolean) => void
  post: Post
}
export const PostModalTitle = ({ changeEditMode, post }: Props) => {
  const { data: currentUser } = authApi.useMeQuery()
  const isMyPost = post.ownerId === currentUser?.userId || false

  return (
    <Dialog.Root>
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
    </Dialog.Root>
  )
}
