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
  size = 50,
}: Props) => {
  const AvatarImage = (
    <img
      alt={alt}
      className={`rounded-full object-cover w-[${size}px] h-[${size}px]`}
      src={avatarURL}
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
