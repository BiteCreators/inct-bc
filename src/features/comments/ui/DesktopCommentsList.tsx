import React from 'react'

import { ScrollArea } from '@/common/ui'
import { Post } from '@/entities/posts'
import { PostComment } from '@/features/comments'
import { PostDescription } from '@/features/posts'

type Props = {
  comments: { id: string; text: string }[]
  description: React.ReactNode
}

export const DesktopCommentsList = ({ comments, description }: Props) => {
  return (
    <ScrollArea className={'flex-1 px-6 pt-5 pb-2 w-full'}>
      <div className={'flex flex-col gap-4 h-[336px]'}>
        {description}
        {comments.map(el => (
          <PostComment key={el.id} text={el.text} />
        ))}
      </div>
    </ScrollArea>
  )
}
