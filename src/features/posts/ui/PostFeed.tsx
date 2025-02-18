import { ReactNode, useEffect, useRef, useState } from 'react'

import { Avatar } from '@/common/types/api.types'
import { commentsApi } from '@/entities/comments'
import { type Post } from '@/entities/posts'
import { AddCommentTextarea } from '@/features/comments'
import { PostDescription } from '@/features/posts'
import { useLikePost } from '@/features/posts/model/useLikePost'
import { LikesAvatars } from '@/features/posts/ui/LikesAvatars'
import { Alert, Button, Slider, Typography, UserProfile } from '@byte-creators/ui-kit'
import {
  BookmarkOutline,
  Heart,
  HeartOutline,
  MessageCircleOutline,
  MoreHorizontal,
  PaperPlaneOutline,
} from '@byte-creators/ui-kit/icons'
import { cn, useGetRelativeTime } from '@byte-creators/utils'
import Link from 'next/link'

type Props = {
  post: Post
}

export const PostFeed = ({ post }: Props) => {
  const [isCommented, setIsCommented] = useState(false)
  const [contentComment, setContentComment] = useState<string>('')

  const { getRelativeTime } = useGetRelativeTime()
  const relativeTime = getRelativeTime(new Date(post.createdAt).getTime())

  const { apiError, handleLike, postLikes } = useLikePost(post)

  const {
    data: comments,
    isError: commentsIsError,
    isLoading: commentsIsLoading,
  } = commentsApi.useGetCommentsQuery({ postId: post.id || 0 })

  useEffect(() => {
    if (comments) {
      if (comments.items.length > 0) {
        setIsCommented(true)
      } else {
        setIsCommented(false)
      }
    }
  }, [comments])

  const getSlides = (
    images: ({
      uploadId: string
    } & Avatar)[]
  ): ReactNode[] => {
    return images.map(image => <img key={image.uploadId} src={image.url} />)
  }

  return (
    <div className={'mb-9'}>
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
      <div className={'flex justify-between mt-3 mb-4'}>
        <div className={'flex gap-5'}>
          <Button className={'p-0 bg-transparent'} onClick={handleLike} variant={'icon'}>
            {postLikes?.isLiked ? <Heart className={'text-danger-500'} /> : <HeartOutline />}
          </Button>
          <Button className={'p-0 bg-transparent'} variant={'icon'}>
            <Link href={`/profile/${post.ownerId}/publications/${post.id}`}>
              <MessageCircleOutline />
            </Link>
          </Button>
          <Button className={'p-0 bg-transparent'} variant={'icon'}>
            <PaperPlaneOutline />
          </Button>
        </div>
        <Button className={'p-0 bg-transparent'} variant={'icon'}>
          <BookmarkOutline />
        </Button>
      </div>
      <PostDescription post={post} withTime={false} />
      <div className={'mb-5'}>
        <div className={'flex'}>
          {postLikes?.items && postLikes.items.length > 0 && (
            <LikesAvatars items={postLikes.items} />
          )}

          <div className={cn(['flex pt-1', postLikes?.items?.length === 1 && '-ml-3'])}>
            <Typography variant={'regular-text'}>{postLikes?.totalCount}</Typography>
            <Typography className={'font-bold ml-1'} variant={'regular-text'}>
              &#34;Like&#34;
            </Typography>
          </div>
        </div>
      </div>
      {isCommented ? (
        <Button
          className={'mb-1 p-0 border-none text-light-900 text-sm font-weight700'}
          variant={'text'}
        >
          <Link href={`/publications/${post.id}`}>
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
