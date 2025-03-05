import React from 'react'
import Skeleton from 'react-loading-skeleton'

import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { authSlice } from '@/entities/auth'
import { selectUserId } from '@/entities/auth/model/auth.slice'
import { commentsApi } from '@/entities/comments'
import { postsApi } from '@/entities/posts'
import { AddCommentTextarea, PostComment } from '@/features/comments'
import { PostDescription } from '@/features/posts'
import { useCommentState } from '@/widgets/post-details/model/useCommentState'
import { Alert, Typography } from '@byte-creators/ui-kit'
import { ArrowBackOutline } from '@byte-creators/ui-kit/icons'
import { skipToken } from '@reduxjs/toolkit/query'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export const PostComments = () => {
  const isAuth = useAppSelector(authSlice.selectors.selectAccessToken)
  const currentUserId = useAppSelector(selectUserId)
  const params = useParams()
  const id = params?.id
  const postId = params?.postId
  const { data: post } = postsApi.useGetPublicPostByIdQuery(
    params !== null ? { postId: Number(params.postId) } : skipToken
  )
  const { data: commentsData, isLoading } = commentsApi.useGetCommentsQuery(
    currentUserId ? { postId: post?.id || 0 } : skipToken
  )

  let comments = commentsData?.items

  if (currentUserId) {
    const currentUserComments = commentsData?.items.filter(
      comment => comment.from.id === currentUserId
    )
    const commentsWithoutCurrentUser = commentsData?.items.filter(
      comment => comment.from.id !== currentUserId
    )

    if (currentUserComments && commentsWithoutCurrentUser) {
      comments = [...currentUserComments, ...commentsWithoutCurrentUser]
    }
  }
  const {
    answerData,
    contentComment,
    correct,
    handleAnswerClick,
    limit,
    setContentComment,
    textareaRef,
  } = useCommentState()

  const skeletonComments = Array.from({ length: 5 }).map((_, index) => (
    <div className={'mb-4'} key={index}>
      <Skeleton className={'h-6 mb-2'} />
      <Skeleton className={'h-4 w-3/5'} />
    </div>
  ))

  return post ? (
    <div className={'-my-9'}>
      <div className={'bg-dark-700 border-dark-300 border-b-[1px] text-center w-full py-4'}>
        <div className={'flex items-center px-3'}>
          <button className={'w-12 h-12'}>
            <Link href={`/profile/${id}/publications/${postId}/`}>
              <ArrowBackOutline viewBox={'0 -2 24 24'} />
            </Link>
          </button>
          <Typography className={'w-full mr-6 font-semibold'} variant={'h2'}>
            Comments
          </Typography>
        </div>
        <div className={'px-6 text-start pt-3 -mb-2'}>
          <PostDescription post={post} />
        </div>
      </div>

      {/*Comments*/}
      <div className={'flex-1 px-6 pb-10 w-full mt-6'}>
        {' '}
        <div className={'flex flex-col pb-4'}>
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
        {isAuth && post && (
          <AddCommentTextarea
            answerData={answerData}
            contentComment={contentComment}
            correct={correct}
            limit={limit}
            postId={post.id.toString()}
            ref={textareaRef}
            setContentComment={setContentComment}
          />
        )}
      </div>
    </div>
  ) : (
    'post not found'
  )
}
