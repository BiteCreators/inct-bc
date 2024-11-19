import { ReactNode, useState } from 'react'

import { Close } from '@/common/assets/icons/components'
import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { cn } from '@/common/lib/utils/cn'
import { Modal } from '@/common/ui'
import { Slider } from '@/common/ui/slider/Slider'
import { authSlice } from '@/entities/auth'
import { Comment } from '@/entities/comments/types/comments.types'
import { Post } from '@/entities/posts'
import { AddCommentTextarea, DesktopCommentsList } from '@/features/comments'
import { EditPost } from '@/features/edit-post'
import { PostActionsBlock, PostDescription } from '@/features/posts'
import * as Dialog from '@radix-ui/react-dialog'
import { useRouter } from 'next/router'

import { useCommentState } from '../../model/useCommentState'
import { PostModalTitle } from './PostModalTitle'

type Props = {
  comments?: Comment[]
  post: Post
  slides: ReactNode[]
}

export const PostDesktop = ({ comments, post, slides }: Props) => {
  const router = useRouter()
  const isAuth = useAppSelector(authSlice.selectors.selectAccessToken)
  const [editMode, setEditMode] = useState<boolean>(false)

  const { answerData, contentComment, handleAnswerClick, setContentComment, textareaRef } =
    useCommentState()

  const postWithPic = post.images.length !== 0

  const handleOpenChange = () => {
    router.back()
  }

  return (
    <>
      <EditPost changeEditMode={setEditMode} isOpen={editMode} post={post} slides={slides} />
      <Modal
        className={cn([
          'w-full border-x-8',
          postWithPic ? 'border-dark-900' : 'border-none',
          'lg-md:border-none',
        ])}
        isOpen={!editMode}
        maxWidth={postWithPic ? 'max-w-[980px]' : ''}
        mode={'custom'}
        onOpenChange={handleOpenChange}
      >
        <div className={cn(['flex flex-row'])}>
          {postWithPic && (
            <Slider height={'full'} slides={slides} stylesSlider={'max-w-[500px] min-w-[390px]'} />
          )}
          <>
            <Dialog.Close
              className={cn(
                'absolute m-5 focus:outline-none cursor-pointer',
                postWithPic
                  ? 'invisible lg-md:-top-14 lg-md:-right-14 md:visible'
                  : '-top-14 -right-14'
              )}
            >
              <Close
                className={cn(
                  'fill-current rounded-full text-light-100',
                  postWithPic && 'bg-dark-100',
                  'lg-md:bg-transparent'
                )}
              />
            </Dialog.Close>
            <div className={'max-w-[480px] w-full max-h-[564px] flex flex-col overflow-hidden'}>
              <PostModalTitle changeEditMode={setEditMode} post={post} />
              <div className={'border-y-[1px] border-dark-100'} />
              <DesktopCommentsList
                comments={comments}
                description={<PostDescription post={post} />}
                handleAnswerClick={handleAnswerClick}
              />
              <PostActionsBlock post={post} />
              {isAuth && (
                <AddCommentTextarea
                  answerData={answerData}
                  contentComment={contentComment}
                  postId={post.id.toString()}
                  ref={textareaRef}
                  setContentComment={setContentComment}
                />
              )}
            </div>
          </>
        </div>
      </Modal>
    </>
  )
}
