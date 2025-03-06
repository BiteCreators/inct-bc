import { ReactNode } from 'react'

import { Comment } from '@/entities/comments/types/comments.types'
import { DesktopCommentContent } from '@/features/comments/ui/DesktopCommentContent'
import { MobileCommentContent } from '@/features/comments/ui/MobileCommentContent'
import { Alert, Typography } from '@byte-creators/ui-kit'
import { cn, useMediaQuery } from '@byte-creators/utils'

import { useCommentInteractions } from '../model/useCommentInteractions'
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
    apiError,
    handleUpdateLikeStatusAnswer,
    handleUpdateLikeStatusComment,
    isAnswersExist,
    isAnswersOpen,
    relativeTime,
    setApiError,
    setIsAnswersOpen,
  } = useCommentInteractions({ comment })
  const isSuperSmallScreen = useMediaQuery('(max-width: 480px)')

  return (
    <div className={'grid grid-cols-[auto_1fr] grid-flow-row mb-4 last:mb-0 gap-x-3 items-start'}>
      {apiError && (
        <Alert
          message={apiError}
          onClose={() => setApiError('')}
          portal
          purpose={'toast'}
          type={'error'}
        />
      )}
      {isSuperSmallScreen ? (
        <MobileCommentContent
          answers={answers}
          answersCount={answersCount}
          comment={comment}
          handleAnswerClick={handleAnswerClick}
          handleUpdateLikeStatusAnswer={handleUpdateLikeStatusAnswer}
          handleUpdateLikeStatusComment={handleUpdateLikeStatusComment}
          isAnswersExist={isAnswersExist}
          isAnswersOpen={isAnswersOpen}
          relativeTime={relativeTime}
          setIsAnswersOpen={setIsAnswersOpen}
        >
          {children}
        </MobileCommentContent>
      ) : (
        <DesktopCommentContent
          comment={comment}
          handleAnswerClick={handleAnswerClick}
          handleUpdateLikeStatusComment={handleUpdateLikeStatusComment}
          relativeTime={relativeTime}
        >
          {children}
        </DesktopCommentContent>
      )}
      {isAnswersExist &&
        (isSuperSmallScreen ? null : (
          <div className={'col-span-1 row-span-1'}>
            <button
              className={cn('mt-3 relative pl-8', isAnswersOpen && 'mb-3')}
              onClick={() => setIsAnswersOpen(!isAnswersOpen)}
            >
              <span className={'absolute w-6 h-[1px] bg-light-900 left-0 top-1/2'}></span>
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
        ))}
    </div>
  )
}
