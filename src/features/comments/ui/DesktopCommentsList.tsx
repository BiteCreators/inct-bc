import React from 'react'

import { ScrollArea } from '@/common/ui'
import { Comment } from '@/entities/comments/types/comments.types'
import { PostComment } from '@/features/comments'

type Props = {
  comments?: Comment[]
  description: React.ReactNode
}

export const DesktopCommentsList = ({ comments, description }: Props) => {
  return (
    <ScrollArea className={'flex-1 px-6 pt-5 pb-2 w-full'}>
      <div className={'flex flex-col gap-4 h-[336px]'}>
        {description}
        {comments && comments.length > 0
          ? comments.map(comment => <PostComment key={comment.id} comment={comment} />)
          : 'No comments'}
      </div>
    </ScrollArea>
  )
}
