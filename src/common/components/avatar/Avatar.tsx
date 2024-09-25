type Props = {
  avatarURL: string
  href: string
  rel?: string
  size: number
}

export const Avatar = ({ avatarURL, href, rel = '', size = 50 }: Props) => {
  return (
    <a href={href} rel={rel}>
      <img
        alt={'Avatar'}
        className={`rounded-full object-cover`}
        src={avatarURL}
        style={{ height: `${size}px`, width: `${size}px` }}
      />
    </a>
  )
}
