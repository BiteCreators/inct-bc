import Link from 'next/link'

type Props = {
  alt?: string
  avatarURL: string
  closeFunc?: () => void
  href?: string
  isNextLink?: boolean
  rel?: string
  showClose?: boolean
  size: number
}

export const Avatar = ({
  alt = 'Avatar',
  avatarURL,
  closeFunc,
  href,
  isNextLink = false,
  rel = '',
  showClose = false,
  size,
}: Props) => {
  const closeHandler = () => {
    if (closeFunc) {
      closeFunc()
    }
  }
  const AvatarImage = (
    <div className={`relative w-[${size}px h-[${size}px rounded-full`}>
      <img
        alt={alt}
        className={'rounded-full object-cover'}
        src={avatarURL}
        style={{ height: `${size}px`, width: `${size}px` }}
      />
      {showClose && (
        <div
          className={
            'bg-danger-100 absolute rounded-full w-8 h-8 right-0 top-1/4 transform -translate-y-1/2'
          }
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
