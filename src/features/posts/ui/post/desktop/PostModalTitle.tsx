import React from 'react'

import { Post } from '@/app/inct.types'
import { cn } from '@/common/lib/utils/cn'
import { Avatar, Dropdown, Typography } from '@/common/ui'
import * as Dialog from '@radix-ui/react-dialog'
type Props = {
  post: Post
}
export const PostModalTitle = ({ post }: Props) => {
  return (
    <Dialog.Title className={cn('font-bold py-3 px-6')}>
      <div className={'flex justify-between w-full'}>
        <div className={'flex max-h-9 py-0 gap-3 items-center'}>
          <div className={'flex items-center pt-2'}>
            <Avatar avatarURL={post.avatarOwner} imgStyles={'w-9 h-9 object-cover'} />
          </div>
          <Typography variant={'h2'}>{post.userName}</Typography>
        </div>
        <Dropdown className={'-top-0.5 -mr-3'} items={[]} />
      </div>
    </Dialog.Title>
  )
}
