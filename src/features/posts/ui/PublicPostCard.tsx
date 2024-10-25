import { Image } from '@/common/assets/icons/components'
import { useGetRelativeTime } from '@/common/lib/hooks/useGetRelativeTime'
import { useShowMore } from '@/common/lib/hooks/useShowMore'
import { Avatar, Typography } from '@/common/ui'
import { Post } from '@/entities/posts'
import Link from 'next/link'

type Props = {
  post: Post
}

export const PublicPostCard = ({ post }: Props) => {
  const { relativeTime } = useGetRelativeTime({ time: new Date(post.createdAt).getTime() })

  const { collapsable, isCollapsed, textToShow, toggleShowMore } = useShowMore({
    text: post.description,
  })

  return (
    <div className={'hover:scale-105 duration-75'}>
      <div className={'cursor-pointer'}>
        {post.images.length === 0 ? (
          <div className={'flex w-full h-full justify-center items-center'}>
            <Image />
          </div>
        ) : (
          <Link href={`/profile/${post.ownerId}/publications/${post.id}`}>
            <img
              alt={post.images[0].url}
              height={post.images[0].height}
              src={post.images[0].url}
              width={post.images[0].width}
            />
          </Link>
        )}
      </div>
      <div className={'mt-3 flex gap-3 items-center'}>
        {/* TODO: add user profile component */}
        <div className={'w-9 h-9'}>
          <Avatar avatarURL={post.avatarOwner} />
        </div>
        <Link href={`/profile/${post.ownerId}`}>
          <Typography className={'font-weight600 cursor-pointer'}>{post.userName}</Typography>
        </Link>
      </div>
      <Typography className={'mt-3 text-light-900'} variant={'small-text'}>
        {relativeTime}
      </Typography>
      <Typography className={'mt-[3px]'}>
        {textToShow}
        {collapsable && (
          <span
            className={
              'text-primary-500 underline underline-offset-2 cursor-pointer hover:text-primary-300'
            }
            onClick={toggleShowMore}
          >
            {isCollapsed ? 'Show more' : 'Hide'}
          </span>
        )}
      </Typography>
    </div>
  )
}
