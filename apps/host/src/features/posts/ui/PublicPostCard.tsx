import { Post } from '@/entities/posts'
import { UserProfile } from '@/entities/profile'
import { Image } from '@packages/shared/assets/icons/components'
import { useGetRelativeTime } from '@packages/shared/hooks/useGetRelativeTime'
import { useShowMore } from '@packages/shared/hooks/useShowMore'
import { Typography } from '@packages/shared/ui'
import Link from 'next/link'

type Props = {
  post: Post
}

export const PublicPostCard = ({ post }: Props) => {
  const { getRelativeTime } = useGetRelativeTime()
  const relativeTime = getRelativeTime(new Date(post.createdAt).getTime())

  const { collapsable, isCollapsed, textToShow, toggleShowMore } = useShowMore({
    text: post.description,
  })

  return (
    <div className={'hover:scale-105 duration-75'}>
      <div className={'cursor-pointer'}>
        {post.images.length === 0 ? (
          <Link href={`/profile/${post.ownerId}/publications/${post.id}`}>
            <div className={'flex w-full justify-center items-center bg-dark-500 h-[234px]'}>
              <Image />
            </div>
          </Link>
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
        <UserProfile
          avatarUrl={post.avatarOwner}
          profileId={post.ownerId}
          userName={post.userName}
        />
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
