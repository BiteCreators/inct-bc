import { Close } from '@/common/assets/icons/components'
import { cn } from '@/common/lib/utils/cn'
import Link from 'next/link'

type Props = {
  alt?: string
  avatarURL: string
  href?: string
  isNextLink?: boolean
  onClose?: () => void
  rel?: string
  rounded?: boolean
  showClose?: boolean
  size: number
}

export const Avatar = ({
  alt = 'Avatar',
  avatarURL,
  href,
  isNextLink = false,
  onClose,
  rel = '',
  rounded = true,
  showClose = false,
  size,
}: Props) => {
  const closeHandler = () => {
    if (onClose) {
      onClose()
    }
  }
  const AvatarImage = (
    <div className={cn([`relative w-[${size}px h-[${size}px`])}>
      <img
        alt={alt}
        className={cn([rounded && 'rounded-full', 'object-cover'])}
        src={avatarURL}
        style={{ height: `${size}px`, width: `${size}px` }}
      />
      {showClose && (
        <div
          className={cn([
            'bg-dark-700 flex justify-center items-center absolute w-9 h-9 right-0 top-[4%]',
            rounded && 'rounded-full',
          ])}
          onClick={closeHandler}
        >
          <div
            className={
              'flex items-center justify-center bg-danger-500 rounded-full hover:cursor-pointer'
            }
          >
            <Close />
          </div>
        </div>
      )}
    </div>
  )

  return isNextLink && href ? (
    <Link href={href} rel={rel}>
      {AvatarImage}
    </Link>
  ) : (
    <a href={href} rel={rel}>
      {AvatarImage}
    </a>
  )
}
