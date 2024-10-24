import { HeartOutline } from '@/common/assets/icons/components'
import { Avatar, Typography } from '@/common/ui'
import { Post } from '@/pages/profile/[id]/publications/[postId]/SinglePostPage'

type Props = {
  post: Post
}

export const PostDescription = ({ post }: Props) => {
  return (
    <div className={'flex mb-4 gap-3 items-start'}>
      <div className={'flex-shrink-0 pt-1'}>
        <Avatar avatarURL={post.avatarOwner} imgStyles={'w-9 h-9 object-cover'} />
      </div>
      <div className={'flex-1'}>
        <Typography variant={'regular-text'}>
          {<span className={'text-base font-weight600 leading-5'}>{post.userName} </span>}
          {post.description}
        </Typography>
        <div className={'mt-1 flex gap-3'}>
          <Typography className={'text-light-900'} variant={'small-text'}>
            2 hours ago
          </Typography>
          {
            <Typography className={'text-light-900 font-weight600'} variant={'small-text'}>
              Like: 2
            </Typography>
          }
        </div>
      </div>
      <div className={'flex justify-center items-center mt-4 ml-2 w-4 h-4'}>
        <button>
          <HeartOutline height={16} viewBox={'0 0 24 24'} width={16} />
        </button>
      </div>
    </div>
  )
}
