import Skeleton from 'react-loading-skeleton'

import { Button } from '@byte-creators/ui-kit'
import { cn } from '@byte-creators/utils'

type Props = {
  count: number | undefined
  isLoading?: boolean
  label: string
  locale: 'en' | 'ru'
  onClick?: () => void
}

export const ProfileFollowButton = ({
  count,
  isLoading = false,
  label,
  locale,
  onClick,
}: Props) => {
  return (
    <Button
      asChild
      className={'p-0 text-light-100 cursor-pointer'}
      onClick={onClick}
      variant={'text'}
    >
      <div className={cn('flex flex-col text-xs sm:text-sm')}>
        {isLoading ? (
          <Skeleton height={50} width={90} />
        ) : (
          <>
            <span className={cn('font-weight700')}>
              {count && count.toLocaleString(locale === 'ru' ? 'ru-Ru' : 'en-Us')}
            </span>
            <span>{label}</span>
          </>
        )}
      </div>
    </Button>
  )
}
