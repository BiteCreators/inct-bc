import React from 'react'

import { Post, postsApi } from '@/entities/posts'
import { Reaction } from '@/entities/posts/types/likes.types'
import { LikesAvatars } from '@/features/posts/ui/LikesAvatars'
import { Typography } from '@byte-creators/ui-kit'
import {
  BookmarkOutline,
  Heart,
  HeartOutline,
  PaperPlaneOutline,
} from '@byte-creators/ui-kit/icons'
import { cn } from '@byte-creators/utils'

type Props = {
  post: Post
}

export const PostActionsBlock = ({ post }: Props) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(post.createdAt))

  const [updateLikeStatusPost] = postsApi.useUpdateLikeStatusPostMutation()
  const { data: postLikes, refetch } = postsApi.useGetPostLikesQuery({ postId: post.id })

  const handleLike = async () => {
    const newLikeStatus = postLikes?.isLiked ? 'NONE' : 'LIKE'

    try {
      await updateLikeStatusPost({
        likeStatus: newLikeStatus as Reaction,
        postId: post.id,
      }).unwrap()
      refetch()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={cn(['border-transparent relative', 'md:border-y-[1px] border-dark-100'])}>
      <div className={cn(['pt-4 px-0', 'md:px-6'])}>
        <div className={'flex justify-between mb-3'}>
          <div>
            <button className={'mr-6'} onClick={handleLike}>
              {postLikes?.isLiked ? <Heart className={'text-danger-500'} /> : <HeartOutline />}
            </button>
            <button>
              <PaperPlaneOutline viewBox={'0 0 26 26'} />
            </button>
          </div>
          <button>
            <BookmarkOutline viewBox={'0 3 24 24'} />
          </button>
        </div>
        <div className={'mb-3'}>
          {/*--------LIKES-----------*/}
          <div className={'flex mb-2'}>
            {postLikes?.items && postLikes.items.length > 0 && (
              <LikesAvatars items={postLikes.items} />
            )}

            <div className={cn(['flex pt-1', postLikes?.items?.length === 1 && '-ml-3'])}>
              <Typography variant={'regular-text'}>{post.likesCount}</Typography>
              <Typography className={'font-bold ml-1'} variant={'regular-text'}>
                &#34;Like&#34;
              </Typography>
            </div>
          </div>

          {/*------------------------*/}
          <Typography className={'text-light-900 font-weight600'} variant={'small-text'}>
            {formattedDate}
          </Typography>
        </div>
      </div>
    </div>
  )
}
