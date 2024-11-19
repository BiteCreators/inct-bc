import { ReactNode } from 'react'

import { Heart, HeartOutline } from '@/common/assets/icons/components'
import { cn } from '@/common/lib/utils/cn'
import { Avatar, Typography } from '@/common/ui'
import { Comment } from '@/entities/comments/types/comments.types'

import { useCreateComment } from '../model/useCreateComment'
import { CommentAnswer } from './CommentAnswer'

type Props = {
  children?: ReactNode
  comment: Comment
  handleAnswerClick: (data: { commentId: number; postId: number; userName: string }) => void
}

export const PostComment = ({ children, comment, handleAnswerClick }: Props) => {
  const {
    answers,
    answersCount,
    handleUpdateLikeStatusAnswer,
    handleUpdateLikeStatusComment,
    isAnswersExist,
    isAnswersOpen,
    relativeTime,
    setIsAnswersOpen,
  } = useCreateComment({ comment })

  return (
    <div className={'flex mb-4 last:mb-0 gap-3 items-start'}>
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
          {!!comment.likeCount && (
            <Typography className={'text-light-900 font-weight600'} variant={'small-text'}>
              Like: {comment.likeCount}
            </Typography>
          )}
          <Typography className={'text-light-900 font-weight600'} variant={'small-text'}>
            <button
              onClick={() =>
                handleAnswerClick?.({
                  commentId: comment.id,
                  postId: comment.postId,
                  userName: comment.from.username,
                })
              }
            >
              Answer
            </button>
          </Typography>
        </div>
        {isAnswersExist && (
          <div className={'mt-2'}>
            <button
              className={cn(isAnswersOpen && 'mb-3')}
              onClick={() => setIsAnswersOpen(!isAnswersOpen)}
            >
              <Typography className={'text-light-900 font-weight600'} variant={'small-text'}>
                {isAnswersOpen ? 'hide' : 'show'} answers ({answersCount})
              </Typography>
            </button>
            <ul>
              {isAnswersOpen &&
                answers?.map(answer => (
                  <CommentAnswer
                    answer={answer}
                    handleAnswerClick={handleAnswerClick}
                    handleUpdateLikeStatusAnswer={handleUpdateLikeStatusAnswer}
                    key={answer.id}
                    postId={comment.postId}
                  />
                ))}
            </ul>
          </div>
        )}
      </div>
      <div
        className={cn(
          'flex justify-center items-center mt-4 ml-2 w-4 h-4',
          comment.isLiked && 'text-danger-500'
        )}
      >
        <button onClick={handleUpdateLikeStatusComment}>
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
