import { ReactNode } from 'react'

import { HeartOutline } from '@/common/assets/icons/components'
import { Avatar, Typography } from '@/common/ui'

import exampleAvatar from '../../../../public/examples/exampleAvatar.png'

type Props = {
  children?: ReactNode
  text?: string
}

export const PostComment = ({ children, text }: Props) => {
  return (
    <div className={'flex mb-4 gap-3 items-start'}>
      <div className={'flex-shrink-0 w-9 h-9 pt-1'}>
        <Avatar avatarURL={exampleAvatar.src} imgStyles={'w-full h-full'} />
      </div>
      <div className={'flex-1'}>
        <Typography variant={'regular-text'}>
          {<span className={'text-base font-weight600 leading-5'}>URLProfile </span>}
          {children || text}
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
          <Typography className={'text-light-900 font-weight600'} variant={'small-text'}>
            Answer
          </Typography>
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
