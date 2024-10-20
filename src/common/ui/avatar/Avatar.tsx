import { Close } from '@/common/assets/icons/components'
import { cn } from '@/common/lib/utils/cn'
import Link from 'next/link'

type Props = {
  alt?: string
  avatarURL: string
  href?: string
  imgStyles?: string
  isNextLink?: boolean
  onClose?: () => void
  rel?: string
  rounded?: boolean
  showClose?: boolean
}

export const Avatar = ({
  alt = 'Avatar',
  avatarURL,
  href,
  imgStyles,
  isNextLink = false,
  onClose,
  rel = '',
  rounded = true,
  showClose = false,
}: Props) => {
  const closeHandler = () => {
    if (onClose) {
      onClose()
    }
  }
  const AvatarImage = (
    <span className={'relative inline-block'}>
      <img alt={alt} className={cn(imgStyles, [rounded && 'rounded-full'])} src={avatarURL} />
      {showClose && (
        <span
          className={cn([
            'bg-dark-700 flex justify-center items-center absolute w-9 h-9 right-0 top-[4%]',
            rounded && 'rounded-full',
          ])}
          onClick={closeHandler}
        >
          <span
            className={
              'flex items-center justify-center bg-danger-500 rounded-full hover:cursor-pointer'
            }
          >
            <Close />
          </span>
        </span>
      )}
    </span>
  )

  return isNextLink && href ? (
    <Link className={'max-w-full h-full text-center'} href={href} rel={rel}>
      {AvatarImage}
    </Link>
  ) : (
    <a className={'max-w-full h-full text-center flex'} href={href} rel={rel}>
      {AvatarImage}
    </a>
  )
}
