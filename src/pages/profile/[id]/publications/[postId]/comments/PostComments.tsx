import React from 'react'

import { ArrowBackOutline } from '@/common/assets/icons/components'
import { Typography } from '@/common/ui'
import { PostCommentsMapBlock } from '@/features/posts/ui/post/commonUi/PostCommentsMapBlock'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export const PostComments = () => {
  const comments = [
    {
      id: '1',
      text: 'eiusmodcididunt ut laboreagna aliquaeiusmod tempor incididunt ut labore et dolore magna aliquaeiusmod tempor incididunt ut labore et dolore magna aliquaeiusmod tempor incididunt ut labore et dolore magna aliqua',
    },
    { id: '2', text: 'eiusmod' },
    { id: '3', text: 'eiusmod tempor labore et dolore magna aliqua' },
    {
      id: '4',
      text: 'eiusmod tempor incididunt ut labore et dolore magna aliquadolore magna aliqua',
    },
  ]
  const params = useParams<{ id: string; postId: string }>()
  const id = params?.id
  const postId = params?.postId

  return (
    <div className={'-my-6 md:hidden'}>
      {/*Header*/}
      <div className={'flex items-center justify-center'}>
        <button className={'absolute left-4'}>
          <Link href={`/profile/${id}/publications/${postId}/`}>
            <ArrowBackOutline viewBox={'0 -2 24 24'} />
          </Link>
        </button>
        <Typography className={'font-weight700'} variant={'h2'}>
          Comments
        </Typography>
      </div>
      {/*Comments*/}
      <PostCommentsMapBlock comments={comments} />
    </div>
  )
}
