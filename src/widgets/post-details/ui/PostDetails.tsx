import { useMediaQuery } from '@/common/lib/hooks/useMediaQuery'
import { commentsApi } from '@/entities/comments'
import { Post } from '@/entities/posts'

import { PostDesktop } from './desktop/PostDesktop'
import { PostMobile } from './mobile/PostMobile'

type Props = {
  post: Post
}

export const PostDetails = ({ post }: Props) => {
  //TODO: remove any
  const slides = post.images.map((image: any, i) => (
    <img alt={'postImg'} className={'h-full object-cover object-center'} key={i} src={image.url} />
  ))
  const isLargeScreen = useMediaQuery('(min-width: 768px)')
  //const comments = [
  //  {
  //    id: '1',
  //    text: 'eiusmodcididunt ut laboreagna aliquaeiusmod tempor incididunt ut labore et dolore magna aliquaeiusmod tempor incididunt ut labore et dolore magna aliquaeiusmod tempor incididunt ut labore et dolore magna aliqua',
  //  },
  //  { id: '2', text: 'eiusmod' },
  //  { id: '3', text: 'eiusmod tempor labore et dolore magna aliqua' },
  //  {
  //    id: '4',
  //    text: 'eiusmod tempor incididunt ut labore et dolore magna aliquadolore magna aliqua',
  //  },
  //]

  const { data, error } = commentsApi.useGetCommentsQuery({ postId: post.id })

  const comments = data?.items

  if (isLargeScreen) {
    return <PostDesktop comments={comments} post={post} slides={slides} />
  } else {
    return <PostMobile comments={comments} post={post} slides={slides} />
  }
}
