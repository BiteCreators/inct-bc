import { cn } from '@/common/lib/utils/cn'
import { Button } from '@/common/ui'
import Link from 'next/link'

type Props = {
  count: number | undefined
  label: string
  locale: 'en' | 'ru'
  onClick?: () => void
}

export const ProfileFollowButton = ({ count, label, locale, onClick }: Props) => {
  return (
    <Button
      asChild
      className={'p-0 text-light-100 cursor-pointer'}
      onClick={onClick}
      variant={'text'}
    >
      <div className={cn('flex flex-col text-xs sm:text-sm')}>
        <span className={cn('font-weight700')}>
          {count && count.toLocaleString(locale === 'ru' ? 'ru-Ru' : 'en-Us')}
        </span>
        <span>{label}</span>
      </div>
    </Button>
  )
}
