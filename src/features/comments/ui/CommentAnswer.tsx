import React, { ReactNode } from 'react'

import { Answer } from '@/entities/comments/types/comments.types'
import { Avatar, Typography } from '@byte-creators/ui-kit'
import { Heart, HeartOutline } from '@byte-creators/ui-kit/icons'
import { cn, useGetRelativeTime, useMediaQuery } from '@byte-creators/utils'

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
  const isLargeScreen = useMediaQuery('(min-width: 920px)')
  const { getRelativeTime } = useGetRelativeTime()
  const relativeTime = getRelativeTime(new Date(answer.createdAt).getTime())

  return (
    <li className={'flex mb-4 last:mb-0 gap-3 items-start'}>
      <div className={'flex-shrink-0 pt-1'}>
        <Avatar avatarURL={answer.from.avatars[0].url} imgStyles={'w-9 h-9 object-cover'} />
      </div>
      <div className={'flex'}>
        <div>
          <Typography className={'break-all'} variant={'regular-text'}>
            <span className={'text-base font-weight600 leading-5 mr-2'}>
              {answer.from.username}
            </span>
            {isLargeScreen && (children || answer.content)}
          </Typography>

          {!isLargeScreen && (
            <Typography className={'text-[14px] break-all'} variant={'regular-text'}>
              {children || answer.content}
            </Typography>
          )}

          <div className={'mt-2 flex gap-3'}>
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
            <div
              className={cn(
                'flex justify-center items-center ml-3 w-4 h-4',
                answer.isLiked && 'text-danger-500'
              )}
            >
              <button onClick={() => handleUpdateLikeStatusAnswer(answer)}>
                {answer.isLiked ? (
                  <Heart height={16} viewBox={'0 1 24 24'} width={16} />
                ) : (
                  <HeartOutline height={16} viewBox={'0 1 24 24'} width={16} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
