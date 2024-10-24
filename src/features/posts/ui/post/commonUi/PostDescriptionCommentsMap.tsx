import React from 'react'

import { ScrollArea } from '@/common/ui'
import { PostComment } from '@/features/posts/ui/post/commonUi/PostComment'
import { PostDescription } from '@/features/posts/ui/post/commonUi/PostDescription'
import { Post } from '@/pages/profile/[id]/publications/[postId]/SinglePostPage'

type Props = {
  comments: { id: string; text: string }[]
  post: Post
}

export const PostDescriptionCommentsMap = ({ comments, post }: Props) => {
  return (
    <ScrollArea className={'flex-1 px-6 pt-5 pb-2 w-full'}>
      <div className={'flex flex-col gap-4 h-[336px]'}>
        <PostDescription post={post} />
        {comments.map(el => (
          <PostComment key={el.id} text={el.text} />
        ))}
      </div>
    </ScrollArea>
  )
}
