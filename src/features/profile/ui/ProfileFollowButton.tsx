import { cn } from '@/common/lib/utils/cn'
import { Button } from '@/common/ui'
import Link from 'next/link'

type Props = {
  count: number
  href: string
  label: string
  locale: 'en' | 'ru'
}

export const ProfileFollowButton = ({ count, href, label, locale }: Props) => {
  return (
    <Button asChild className={'p-0 text-light-100'} variant={'text'}>
      <Link href={href}>
        <div className={cn('flex flex-col text-xs sm:text-sm')}>
          <span className={cn('font-weight700')}>
            {count.toLocaleString(locale === 'ru' ? 'ru-Ru' : 'en-Us')}
          </span>
          <span>{label}</span>
        </div>
      </Link>
    </Button>
  )
}
