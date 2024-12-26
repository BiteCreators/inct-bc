import { Post } from '@/entities/posts'
import { Avatar, Typography } from '@byte-creators/ui-kit'
import Link from 'next/link'

type Props = {
  post: Post
}
export const PostOwnerProfile = ({ post }: Props) => {
  return (
    <div className={'flex max-h-9 py-0 gap-3 items-center'}>
      <div className={'flex items-center pt-2'}>
        <Avatar
          avatarURL={post.avatarOwner}
          href={`/profile/${post.ownerId}`}
          imgStyles={'w-9 h-9 object-cover'}
          isNextLink
        />
      </div>
      <Link
        className={'hover:text-primary-300 text-light-100 duration-75'}
        href={`/profile/${post.ownerId}`}
      >
        <Typography variant={'h2'}>{post.userName}</Typography>
      </Link>
    </div>
  )
}
