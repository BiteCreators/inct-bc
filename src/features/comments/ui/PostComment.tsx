import { ReactNode } from 'react'

import { HeartOutline } from '@/common/assets/icons/components'
import { Avatar, Typography } from '@/common/ui'

import { useGetRelativeTime } from '@/common/lib/hooks/useGetRelativeTime'
import { Comment } from '@/entities/comments/types/comments.types'

type Props = {
  comment: Comment
  children?: ReactNode
}

export const PostComment = ({ children, comment }: Props) => {
  const { getRelativeTime } = useGetRelativeTime()
  const relativeTime = getRelativeTime(new Date(comment.createdAt).getTime())

  return (
    <div className={'flex mb-4 gap-3 items-start'}>
      <div className={'flex-shrink-0 pt-1'}>
        <Avatar avatarURL={comment.from.avatars[0].url} imgStyles={'w-9 h-9 object-cover'} />
      </div>
      <div className={'flex-1'}>
        <Typography variant={'regular-text'}>
          {
            <span className={'text-base font-weight600 leading-5 mr-2'}>
              {comment.from.username}
            </span>
          }
          {children || comment.content}
        </Typography>
        <div className={'mt-1 flex gap-3'}>
          <Typography className={'text-light-900'} variant={'small-text'}>
            {relativeTime}
          </Typography>
          {
            <Typography className={'text-light-900 font-weight600'} variant={'small-text'}>
              Like: {comment.likeCount}
            </Typography>
          }
          <Typography className={'text-light-900 font-weight600'} variant={'small-text'}>
            Answer
          </Typography>
        </div>
      </div>
      <div className={'flex justify-center items-center mt-4 ml-2 w-4 h-4'}>
        <button>
          <HeartOutline height={16} viewBox={'0 0 24 24'} width={16} />
        </button>
      </div>
    </div>
  )
}
