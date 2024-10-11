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
            'bg-danger-100 absolute w-8 h-8 right-0 top-1/4 transform -translate-y-1/2',
            rounded && 'rounded-full',
          ])}
          onClick={closeHandler}
        ></div>
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
