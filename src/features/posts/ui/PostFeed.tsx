import { ReactNode } from 'react'

import { Avatar } from '@/common/types/api.types'
import { type Post } from '@/entities/posts'
import { AddCommentTextarea } from '@/features/comments'
import { PostDescription } from '@/features/posts'
import { Alert, Button, LinearLoader, Slider, Typography, UserProfile } from '@byte-creators/ui-kit'
import { MoreHorizontal } from '@byte-creators/ui-kit/icons'
import { wordWrapping } from '@byte-creators/utils'
import Link from 'next/link'

import { usePostFeed } from '../model/usePostFeed'
import { ActionButtonGroup } from './ActionButtonGroup'
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

  const getSlides = (
    images: ({
      uploadId: string
    } & Avatar)[]
  ): ReactNode[] => {
    return images.map(image => <img key={image.uploadId} src={image.url} />)
  }

  return (
    <div className={'mb-9'}>
      {<LinearLoader isLoading={commentsIsLoading} />}
      {(apiError || commentsIsError) && (
        <Alert
          canClose={false}
          message={apiError || 'Failed to load comments'}
          purpose={'alert'}
          type={'error'}
        />
      )}
      <div className={'flex items-center gap-5 mb-3'}>
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
        <Button className={'p-0 bg-transparent'} variant={'icon'}>
          <MoreHorizontal />
        </Button>
      </div>
      <Slider slides={getSlides(post.images)} />
      {!hasImages && (
        <Typography variant={'regular-text'}>
          {/*TODO: add splitLongWords*/}
          {wordWrapping(post.description)}
        </Typography>
      )}
      <ActionButtonGroup
        handleLike={handleLike}
        postId={post.id}
        postLikes={postLikes}
        userId={post.ownerId}
        withComments
      />
      {hasImages && <PostDescription post={post} withTime={false} />}
      <Likes className={'mb-5'} postLikes={postLikes} />
      {isCommented ? (
        <Button
          className={'mb-1 p-0 border-none text-light-900 text-sm font-weight700'}
          variant={'text'}
        >
          <Link href={`/profile/${post.ownerId}/publications/${post.id}`}>
            {`View all comments (${comments?.items.length})`}
          </Link>
        </Button>
      ) : (
        <span className={'block mb-1 text-light-900 text-sm font-weight700'}> No comments yet</span>
      )}
      <AddCommentTextarea
        contentComment={contentComment}
        postId={post.id.toString()}
        setContentComment={setContentComment}
        transparent
      />
      <div className={'border-b-[1px] border-dark-100 mt-2'} />
    </div>
  )
}
