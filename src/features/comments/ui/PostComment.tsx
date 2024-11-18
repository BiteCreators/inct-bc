import { ReactNode } from 'react'
import { useCookies } from 'react-cookie'

import { Heart, HeartOutline, Trash } from '@/common/assets/icons/components'
import { useGetRelativeTime } from '@/common/lib/hooks/useGetRelativeTime'
import { cn } from '@/common/lib/utils/cn'
import { Avatar, Button, Typography } from '@/common/ui'
import { decodeAccessToken } from '@/entities/auth'
import { commentsApi } from '@/entities/comments'
import { Comment } from '@/entities/comments/types/comments.types'
import { Reaction } from '@/entities/posts/types/likes.types'

type Props = {
  children?: ReactNode
  comment: Comment
}

export const PostComment = ({ children, comment }: Props) => {
  const { getRelativeTime } = useGetRelativeTime()
  const relativeTime = getRelativeTime(new Date(comment.createdAt).getTime())
  //const [cookie] = useCookies(['accessToken'])
  //const { userId } = decodeAccessToken(cookie.accessToken)
  //const isCurrentUserComment = comment.from.id === userId
  const [updateLikeStatus] = commentsApi.useUpdateLikeStatusCommentMutation()

  const handleUpdateLikeStatus = () => {
    if (comment.isLiked) {
      updateLikeStatus({
        commentId: comment.id,
        likeStatus: Reaction.DISLIKE,
        postId: comment.postId,
      })
    } else {
      updateLikeStatus({
        commentId: comment.id,
        likeStatus: Reaction.LIKE,
        postId: comment.postId,
      })
    }
  }

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
          {/*{isCurrentUserComment && (
            <button className={'p-0 leading-none text-light-900 hover:text-primary-500'}>
              <Trash height={16} viewBox={'0 0 26 26'} width={16} />
            </button>
          )}*/}
        </div>
      </div>
      <div
        className={cn(
          'flex justify-center items-center mt-4 ml-2 w-4 h-4',
          comment.isLiked && 'text-danger-500'
        )}
      >
        <button onClick={handleUpdateLikeStatus}>
          {comment.isLiked ? (
            <Heart height={16} viewBox={'0 0 24 24'} width={16} />
          ) : (
            <HeartOutline height={16} viewBox={'0 0 24 24'} width={16} />
          )}
        </button>
      </div>
    </div>
  )
}
