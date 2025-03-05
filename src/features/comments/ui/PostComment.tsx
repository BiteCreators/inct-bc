import { ReactNode } from 'react'

import { Comment } from '@/entities/comments/types/comments.types'
import { Alert, Avatar, Typography } from '@byte-creators/ui-kit'
import { Heart, HeartOutline } from '@byte-creators/ui-kit/icons'
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
      {/*<div className={'col-span-1 row-span-2 pt-1'}>*/}
      {/*  <Avatar avatarURL={comment.from.avatars[0]?.url} imgStyles={'w-9 h-9 object-cover'} />*/}
      {/*</div>*/}
      {isSuperSmallScreen ? (
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
          </div>
        </div>
      ) : (
        <>
          <div className={'col-span-1 row-span-2 pt-1'}>
            <Avatar avatarURL={comment.from.avatars[0]?.url} imgStyles={'w-9 h-9 object-cover'} />
          </div>
          <div className={'col-span-1 row-span-1'}>
            <div className={'flex'}>
              <div className={'flex-1'}>
                <Typography className={'break-words'} variant={'regular-text'}>
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
          </div>
        </>
      )}
      {/*<div className={'col-span-1 row-span-1'}>*/}
      {/*  <div className={'flex'}>*/}
      {/*    <div className={'flex-1'}>*/}
      {/*      <Typography className={'break-words'} variant={'regular-text'}>*/}
      {/*        {*/}
      {/*          <span className={'text-base font-weight600 leading-5 mr-2'}>*/}
      {/*            {comment.from.username}*/}
      {/*          </span>*/}
      {/*        }*/}
      {/*        {children || comment.content}*/}
      {/*      </Typography>*/}
      {/*      <div className={'mt-1 flex gap-3'}>*/}
      {/*        <Typography className={'text-light-900'} variant={'small-text'}>*/}
      {/*          {relativeTime}*/}
      {/*        </Typography>*/}
      {/*        {!!comment.likeCount && (*/}
      {/*          <Typography className={'text-light-900 font-weight600'} variant={'small-text'}>*/}
      {/*            Like: {comment.likeCount}*/}
      {/*          </Typography>*/}
      {/*        )}*/}
      {/*        <Typography className={'text-light-900 font-weight600'} variant={'small-text'}>*/}
      {/*          <button*/}
      {/*            onClick={() =>*/}
      {/*              handleAnswerClick?.({*/}
      {/*                commentId: comment.id,*/}
      {/*                postId: comment.postId,*/}
      {/*                userName: comment.from.username,*/}
      {/*              })*/}
      {/*            }*/}
      {/*          >*/}
      {/*            Answer*/}
      {/*          </button>*/}
      {/*        </Typography>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div*/}
      {/*      className={cn(*/}
      {/*        'flex justify-center items-center mt-4 ml-2 w-4 h-4',*/}
      {/*        comment.isLiked && 'text-danger-500'*/}
      {/*      )}*/}
      {/*    >*/}
      {/*      <button onClick={handleUpdateLikeStatusComment}>*/}
      {/*        {comment.isLiked ? (*/}
      {/*          <Heart height={16} viewBox={'0 0 24 24'} width={16} />*/}
      {/*        ) : (*/}
      {/*          <HeartOutline height={16} viewBox={'0 0 24 24'} width={16} />*/}
      {/*        )}*/}
      {/*      </button>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {isAnswersExist &&
        (isSuperSmallScreen ? (
          <></>
        ) : (
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

//<div className={'col-span-1 row-span-1'}>
//         <div className={'flex'}>
//           <div className={'flex-1'}>
//             <Typography className={'break-words'} variant={'regular-text'}>
//               {
//                 <span className={'text-base font-weight600 leading-5 mr-2'}>
//                   {comment.from.username}
//                 </span>
//               }
//               {children || comment.content}
//             </Typography>
//             <div className={'mt-1 flex gap-3'}>
//               <Typography className={'text-light-900'} variant={'small-text'}>
//                 {relativeTime}
//               </Typography>
//               {!!comment.likeCount && (
//                 <Typography className={'text-light-900 font-weight600'} variant={'small-text'}>
//                   Like: {comment.likeCount}
//                 </Typography>
//               )}
//               <Typography className={'text-light-900 font-weight600'} variant={'small-text'}>
//                 <button
//                   onClick={() =>
//                     handleAnswerClick?.({
//                       commentId: comment.id,
//                       postId: comment.postId,
//                       userName: comment.from.username,
//                     })
//                   }
//                 >
//                   Answer
//                 </button>
//               </Typography>
//             </div>
//           </div>
//           <div
//             className={cn(
//               'flex justify-center items-center mt-4 ml-2 w-4 h-4',
//               comment.isLiked && 'text-danger-500'
//             )}
//           >
//             <button onClick={handleUpdateLikeStatusComment}>
//               {comment.isLiked ? (
//                 <Heart height={16} viewBox={'0 0 24 24'} width={16} />
//               ) : (
//                 <HeartOutline height={16} viewBox={'0 0 24 24'} width={16} />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
