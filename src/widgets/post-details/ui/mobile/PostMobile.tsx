import React, { ReactNode, useState } from 'react'

import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { authApi, authSlice } from '@/entities/auth'
import { Comment } from '@/entities/comments/types/comments.types'
import { Post } from '@/entities/posts'
import { AddCommentTextarea, MobileCommentsList } from '@/features/comments'
import { EditPostMobile } from '@/features/edit-post/ui/EditPostMobile'
import { PostActionsBlock, PostDescription } from '@/features/posts'
import { DropdownPost } from '@/features/posts/ui/DropdownPost'
import { PostOwnerProfile } from '@/features/posts/ui/PostOwnerProfile'
import { Slider } from '@byte-creators/ui-kit'
import { ArrowBackOutline } from '@byte-creators/ui-kit/icons'
import { cn, useMediaQuery } from '@byte-creators/utils'
import Link from 'next/link'

import { useCommentState } from '../../model/useCommentState'

type Props = {
  comments?: Comment[]
  post: Post | undefined
  slides: ReactNode[]
}

export const PostMobile = ({ comments, post, slides }: Props) => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)')
  const isAuth = useAppSelector(authSlice.selectors.selectAccessToken)
  const [editMode, setEditMode] = useState<boolean>(false)
  const { data: currentUser } = authApi.useMeQuery()
  const {
    answerData,
    contentComment,
    correct,
    handleAnswerClick,
    limit,
    setContentComment,
    textareaRef,
  } = useCommentState()

  const isMyPost = post?.ownerId === currentUser?.userId || false

  return editMode ? (
    <EditPostMobile changeEditMode={setEditMode} isOpen={editMode} post={post} slides={slides} />
  ) : (
    <div className={cn(['-my-8 flex flex-col items-center px-4 max-w-[500px] mx-auto'])}>
      {post ? (
        <>
          <div className={'font-bold py-5 sm:py-3 flex justify-between w-full'}>
            <div className={'flex gap-4'}>
              <Link href={`/profile/${post.ownerId}`}>
                <ArrowBackOutline height={26} viewBox={'0 -6 24 24'} />
              </Link>
              <PostOwnerProfile post={post} />
            </div>
            <DropdownPost
              changeEditMode={setEditMode}
              className={'z-50'}
              isMyPost={isMyPost}
              post={post}
            />
          </div>
          <Slider height={'full'} slides={slides} stylesSlider={'max-w-[500px]'} />
          <div className={'max-w-[480px] w-full flex flex-col overflow-hidden'}>
            <PostActionsBlock post={post} />
            <div className={cn(['flex-1 w-full px-0', isLargeScreen && 'px-6'])}>
              <div className={cn(['flex flex-col pt-3 gap-5 w-full', !isAuth && 'mb-4'])}>
                <MobileCommentsList
                  comments={comments}
                  description={<PostDescription post={post} />}
                  handleAnswerClick={handleAnswerClick}
                />
              </div>
            </div>
            <div className={'mb-7 mt-3 pl-1'}>
              {isAuth && (
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
        </>
      ) : (
        'Post no found'
      )}
    </div>
  )
}
