import React from 'react'

import { cn } from '@/common/lib/utils/cn'
import { Avatar, Typography } from '@/common/ui'
import { authApi } from '@/entities/auth'
import { Post } from '@/entities/posts'
import { DropdownPost } from '@/features/posts/ui/DropdownPost'
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
        <div className={'flex max-h-9 py-0 gap-3 items-center'}>
          <div className={'flex items-center pt-2'}>
            <Avatar avatarURL={post.avatarOwner} imgStyles={'w-9 h-9 object-cover'} />
          </div>
          <Typography variant={'h2'}>{post.userName}</Typography>
        </div>
        <DropdownPost changeEditMode={changeEditMode} className={'z-50'} isMyPost post={post} />
      </div>
    </Dialog.Title>
  )
}
