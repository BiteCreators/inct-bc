import Skeleton from 'react-loading-skeleton'

import { cn } from '@byte-creators/utils'

import exampleImage from '../../../../public/examples/exampleAvatar.png'

type Props = {
  className?: string
  isLoading: boolean
  src: string
}
export const UserAvatar = ({ className, isLoading, src }: Props) => {
  return (
    <div className={'self-start'}>
      <div className={className ? className : 'sm:w-36 lg:!w-52'}>
        {isLoading ? (
          <Skeleton className={'aspect-square !rounded-full'} />
        ) : (
          <img
            alt={'Avatar'}
            className={'rounded-full object-cover w-full h-full'}
            src={src || exampleImage.src}
          />
        )}
      </div>
    </div>
  )
}
