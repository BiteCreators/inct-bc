import { PostLikesResponse } from '@/entities/posts'
import { Button } from '@byte-creators/ui-kit'
import {
  BookmarkOutline,
  Heart,
  HeartOutline,
  MessageCircleOutline,
  PaperPlaneOutline,
} from '@byte-creators/ui-kit/icons'
import { cn } from '@byte-creators/utils'
import Link from 'next/link'

type Props = {
  className?: string
  handleLike?: () => Promise<void>
  postId?: number
  postLikes?: PostLikesResponse
  userId?: number
  withComments?: boolean
}

export const ActionButtonGroup = ({
  className,
  handleLike,
  postId,
  postLikes,
  userId,
  withComments,
}: Props) => {
  return (
    <div className={cn(['flex justify-between mt-3 mb-4', className])}>
      <div className={'flex gap-5'}>
        <Button className={'p-0 bg-transparent'} onClick={handleLike} variant={'icon'}>
          {postLikes?.isLiked ? <Heart className={'text-danger-500'} /> : <HeartOutline />}
        </Button>
        {withComments && (
          <Button className={'p-0 bg-transparent'} variant={'icon'}>
            <Link href={`/profile/${userId}/publications/${postId}`}>
              <MessageCircleOutline />
            </Link>
          </Button>
        )}
        <Button className={'p-0 bg-transparent'} variant={'icon'}>
          <PaperPlaneOutline />
        </Button>
      </div>
      <Button className={'p-0 bg-transparent'} variant={'icon'}>
        <BookmarkOutline />
      </Button>
    </div>
  )
}
