import { ReactNode } from 'react'

import { Answer, Comment } from '@/entities/comments/types/comments.types'
import { CommentAnswer } from '@/features/comments/ui/CommentAnswer'
import { Avatar, Typography } from '@byte-creators/ui-kit'
import { Heart, HeartOutline } from '@byte-creators/ui-kit/icons'
import { cn } from '@byte-creators/utils'

type Props = {
  answers: Answer[] | undefined
  answersCount: number | undefined
  children?: ReactNode
  comment: Comment
  handleAnswerClick: (data: { commentId: number; postId: number; userName: string }) => void
  handleUpdateLikeStatusAnswer: (answer: Answer) => Promise<void>
  handleUpdateLikeStatusComment: () => Promise<void>
  isAnswersExist: boolean
  isAnswersOpen: boolean
  relativeTime: string
  setIsAnswersOpen: (isAnswersOpen: boolean) => void
}
export const MobileCommentContent = ({
  answers,
  answersCount,
  children,
  comment,
  handleAnswerClick,
  handleUpdateLikeStatusAnswer,
  handleUpdateLikeStatusComment,
  isAnswersExist,
  isAnswersOpen,
  relativeTime,
  setIsAnswersOpen,
}: Props) => {
  return (
    <div className={'flex'}>
      <div className={'flex flex-col'}>
        <div className={'flex my-1 gap-3'}>
          <Avatar avatarURL={comment.from.avatars[0]?.url} imgStyles={'w-9 h-9 object-cover'} />
          <Typography
            className={'pt-2 break-words text-base font-weight600 leading-5'}
            variant={'regular-text'}
          >
            {comment.from.username}
          </Typography>
        </div>
        <div className={'flex flex-col ml-12'}>
          <Typography className={'text-[14px] mb-[2px] break-words'} variant={'regular-text'}>
            {children || comment.content}
          </Typography>
          <div className={'flex mt-1 gap-3'}>
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
            <div
              className={cn(
                'flex justify-center items-center ml-3 w-4 h-4',
                comment.isLiked && 'text-danger-500'
              )}
            >
              <button onClick={handleUpdateLikeStatusComment}>
                {comment.isLiked ? (
                  <Heart height={16} viewBox={'0 1 24 24'} width={16} />
                ) : (
                  <HeartOutline height={16} viewBox={'0 1 24 24'} width={16} />
                )}
              </button>
            </div>
          </div>
        </div>
        {isAnswersExist && (
          <div className={'ml-12'}>
            <button
              className={cn('mt-3 relative pl-8', isAnswersOpen && 'mb-3')}
              onClick={() => setIsAnswersOpen(!isAnswersOpen)}
            >
              <span className={'absolute w-6 h-[1px] bg-light-900 left-0 top-1/2'}></span>
              <Typography className={'text-light-900 font-weight600'} variant={'small-text'}>
                {isAnswersOpen ? 'hide' : 'show'} answers ({answersCount})
              </Typography>
            </button>
            <ul className={'max-w-[360px] w-fit'}>
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
    </div>
  )
}
