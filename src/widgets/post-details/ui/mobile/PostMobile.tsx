import { ReactNode } from 'react'

import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { authSlice } from '@/entities/auth'
import { Comment } from '@/entities/comments/types/comments.types'
import { Post } from '@/entities/posts'
import { AddCommentTextarea, MobileCommentsList } from '@/features/comments'
import { PostActionsBlock, PostDescription } from '@/features/posts'
import { PostOwnerProfile } from '@/features/posts/ui/PostOwnerProfile'
import { Dropdown, Slider } from '@byte-creators/ui-kit'
import { cn } from '@byte-creators/utils'

import { useCommentState } from '../../model/useCommentState'

type Props = {
  comments?: Comment[]
  post: Post
  slides: ReactNode[]
}

export const PostMobile = ({ comments, post, slides }: Props) => {
  const isAuth = useAppSelector(authSlice.selectors.selectAccessToken)
  const { answerData, contentComment, handleAnswerClick, setContentComment, textareaRef } =
    useCommentState()

  return (
    <div className={cn(['-my-8 flex flex-col items-center px-4 max-w-[500px] mx-auto'])}>
      <div className={'font-bold py-3 flex justify-between w-full'}>
        <PostOwnerProfile post={post} />
        <Dropdown className={'-top-0.5 -mr-3'} items={[]} />
      </div>
      <Slider height={'full'} slides={slides} stylesSlider={'max-w-[500px]'} />
      <div className={'max-w-[480px] w-full flex flex-col overflow-hidden'}>
        <PostActionsBlock post={post} />
        <div className={cn(['flex-1 w-full px-0', 'md:px-6'])}>
          <div className={cn(['flex flex-col pt-3 gap-5 w-full', !isAuth && 'mb-4'])}>
            <MobileCommentsList
              comments={comments}
              description={<PostDescription post={post} />}
              handleAnswerClick={handleAnswerClick}
            />
          </div>
        </div>
        <div className={'mb-7'}>
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
      </div>
    </div>
  )
}
