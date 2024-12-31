import React, { ReactNode } from 'react'

import { Heart, HeartOutline } from '@byte-creators/ui-kit/icons'
import { cn, useGetRelativeTime } from '@byte-creators/utils'
import { Avatar, Typography } from '@byte-creators/ui-kit'
import { Answer } from '@/entities/comments/types/comments.types'

type Props = {
  answer: Answer
  children?: ReactNode
  handleAnswerClick: (data: { commentId: number; postId: number; userName: string }) => void
  handleUpdateLikeStatusAnswer: (answer: Answer) => Promise<void>
  postId: number
}

export const CommentAnswer = ({
  answer,
  children,
  handleAnswerClick,
  handleUpdateLikeStatusAnswer,
  postId,
}: Props) => {
  const { getRelativeTime } = useGetRelativeTime()
  const relativeTime = getRelativeTime(new Date(answer.createdAt).getTime())

  return (
    <li className={'flex mb-4 last:mb-0 gap-3 items-start'}>
      <div className={'flex-shrink-0 pt-1'}>
        <Avatar avatarURL={answer.from.avatars[0].url} imgStyles={'w-9 h-9 object-cover'} />
      </div>
      <div className={'flex flex-1'}>
        <div className={'flex-1'}>
          <Typography className={'break-words'} variant={'regular-text'}>
            {
              <span className={'text-base font-weight600 leading-5 mr-2'}>
                {answer.from.username}
              </span>
            }
            {children || answer.content}
          </Typography>
          <div className={'mt-1 flex gap-3'}>
            <Typography className={'text-light-900'} variant={'small-text'}>
              {relativeTime}
            </Typography>
            {!!answer.likeCount && (
              <Typography className={'text-light-900 font-weight600'} variant={'small-text'}>
                Like: {answer.likeCount}
              </Typography>
            )}
            <Typography className={'text-light-900 font-weight600'} variant={'small-text'}>
              <button
                onClick={() =>
                  handleAnswerClick({
                    commentId: answer.commentId,
                    postId,
                    userName: answer.from.username,
                  })
                }
              >
                Answer
              </button>
            </Typography>
          </div>
        </div>
        <div
          className={cn(
            'flex justify-center items-center mt-4 ml-2 w-4 h-4',
            answer.isLiked && 'text-danger-500'
          )}
        >
          <button onClick={() => handleUpdateLikeStatusAnswer(answer)}>
            {answer.isLiked ? (
              <Heart height={16} viewBox={'0 0 24 24'} width={16} />
            ) : (
              <HeartOutline height={16} viewBox={'0 0 24 24'} width={16} />
            )}
          </button>
        </div>
      </div>
    </li>
  )
}
