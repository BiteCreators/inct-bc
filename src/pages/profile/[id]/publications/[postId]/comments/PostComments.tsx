import React from 'react'
import Skeleton from 'react-loading-skeleton'

import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { authSlice } from '@/entities/auth'
import { commentsApi } from '@/entities/comments'
import { AddCommentTextarea, PostComment } from '@/features/comments'
import { useCommentState } from '@/widgets/post-details/model/useCommentState'
import { Typography } from '@byte-creators/ui-kit'
import { ArrowBackOutline } from '@byte-creators/ui-kit/icons'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function PostComments() {
  const isAuth = useAppSelector(authSlice.selectors.selectAccessToken)
  const {
    answerData,
    contentComment,
    correct,
    handleAnswerClick,
    limit,
    setContentComment,
    textareaRef,
  } = useCommentState()

  const params = useParams<{ id: string; postId: string }>()
  const id = params?.id
  const postId = params?.postId

  const { data } = commentsApi.useGetCommentsQuery({ postId: Number(postId) })

  const comments = data?.items
  const isLoading = true
  const skeletonComments = Array.from({ length: 5 }).map((_, index) => (
    <div className={'mb-4'} key={index}>
      <Skeleton className={'h-6 mb-2'} />
      <Skeleton className={'h-4 w-3/5'} />
    </div>
  ))

  return (
    <div className={'-my-9 md:hidden'}>
      {/*Header*/}
      <div
        className={'bg-dark-700 border-dark-300 border-b-[1px] text-center fixed w-full z-[1] py-4'}
      >
        <button className={'absolute left-4 top-[18px]'}>
          <Link href={`/profile/${id}/publications/${postId}/`}>
            <ArrowBackOutline viewBox={'0 -2 24 24'} />
          </Link>
        </button>
        <Typography className={'font-weight700'} variant={'h2'}>
          Comments
        </Typography>
      </div>
      {/*Comments*/}
      <div className={'flex-1 px-6 pt-20 pb-10 w-full'}>
        <div className={'flex flex-col'}>
          {isLoading
            ? skeletonComments
            : comments?.map(comment => (
                <PostComment
                  comment={comment}
                  handleAnswerClick={handleAnswerClick}
                  key={comment.id}
                />
              ))}
        </div>
        {isAuth && (
          <AddCommentTextarea
            answerData={answerData}
            contentComment={contentComment}
            correct={correct}
            limit={limit}
            postId={postId!}
            ref={textareaRef}
            setContentComment={setContentComment}
          />
        )}
      </div>
    </div>
  )
}
