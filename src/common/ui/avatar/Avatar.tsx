import Link from 'next/link'

type Props = {
  alt?: string
  avatarURL?: string
  href: string
  isNextLink: boolean
  rel?: string
  size: number
}

export const Avatar = ({
  alt = 'Avatar',
  avatarURL,
  href,
  isNextLink = false,
  rel = '',
  size,
}: Props) => {
  const AvatarImage = (
    <img
      alt={alt}
      className={'rounded-full object-cover'}
      src={avatarURL}
      style={{ height: `${size}px`, width: `${size}px` }}
    />
  )

  return isNextLink ? (
    <Link href={href} rel={rel}>
      {AvatarImage}
    </Link>
  ) : (
    <a href={href} rel={rel}>
      {AvatarImage}
    </a>
  )
}
