import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { authSlice } from '@/entities/auth'
import { type Post } from '@/entities/posts'
import { AddCommentTextarea } from '@/features/comments'
import { PostDescription } from '@/features/posts'
import { useHandleNavigateToImage } from '@/features/posts/model/useHandleNavigateToImage'
import { PostDetailsSlide } from '@/widgets/post-details/ui/PostDetailsSlide'
import { Alert, Button, LinearLoader, Slider, Typography, UserProfile } from '@byte-creators/ui-kit'
import { useScopedTranslation, wordWrapping } from '@byte-creators/utils'
import Link from 'next/link'

import { usePostFeed } from '../model/usePostFeed'
import { ActionButtonGroup } from './ActionButtonGroup'
import { DropdownPost } from './DropdownPost'
import { Likes } from './Likes'

type Props = {
  post: Post
}

export const PostFeed = ({ post }: Props) => {
  const {
    apiError,
    comments,
    commentsIsError,
    commentsIsLoading,
    contentComment,
    handleLike,
    hasImages,
    isCommented,
    postLikes,
    relativeTime,
    setContentComment,
  } = usePostFeed({
    post,
  })
  const t = useScopedTranslation('Posts')
  const userId = useAppSelector(authSlice.selectors.selectUserId)
  const isMyPost = post.ownerId === userId || false

  const handleNavigateToImage = useHandleNavigateToImage(post)
  const slides = post?.images.map((image: any, i) => (
    <PostDetailsSlide handleNavigateToImage={handleNavigateToImage} image={image} key={i} />
  ))

  return (
    <div className={'mb-9'}>
      {<LinearLoader isLoading={commentsIsLoading} />}
      {(apiError || commentsIsError) && (
        <Alert
          canClose={false}
          message={apiError || t.errors.failedToLoadComments}
          purpose={'alert'}
          type={'error'}
        />
      )}
      <div className={'flex items-center gap-5 mb-3 relative'}>
        <UserProfile
          avatarUrl={post.avatarOwner}
          className={'relative'}
          classNameTypography={
            "font-semibold after:content-[''] after:absolute after:top-[calc(50%-2px)] after:-right-3 after:w-1 after:h-1 after:bg-light-100 after:rounded-full"
          }
          profileId={post.ownerId}
          userName={post.userName}
        />
        <Typography className={'text-light-900  flex-grow'} variant={'small-text'}>
          {relativeTime}
        </Typography>
        <div className={'w-10 h-10'}>
          <DropdownPost
            changeEditMode={() => {}}
            className={' top-[calc(50%-12px)]'}
            classNameButton={'p-0 outline-none'}
            isFollow
            isMyPost={isMyPost}
            post={post}
          />
        </div>
      </div>
      <Slider slides={slides} />
      {!hasImages && (
        <Typography variant={'regular-text'}>{wordWrapping(post.description)}</Typography>
      )}
      <ActionButtonGroup
        handleLike={handleLike}
        postId={post.id}
        postLikes={postLikes}
        userId={post.ownerId}
        withComments
      />
      {hasImages && <PostDescription post={post} withTime={false} />}
      <Likes className={`${isCommented ? 'mb-5' : 'mb-2'}`} postLikes={postLikes} />
      {isCommented && (
        <Button
          className={'mb-1 p-0 border-none text-light-900 text-sm font-weight700'}
          variant={'text'}
        >
          <Link href={`/profile/${post.ownerId}/publications/${post.id}`}>
            {`${t.viewAllComments} (${comments?.items.length})`}
          </Link>
        </Button>
      )}
      <AddCommentTextarea
        contentComment={contentComment}
        placeholder={t.addComment}
        postId={post.id.toString()}
        setContentComment={setContentComment}
        transparent
      />
      <div className={'border-b-[1px] border-dark-100 mt-2'} />
    </div>
  )
}
