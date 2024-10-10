import { cn } from '@/common/lib/utils/cn'
import { Button } from '@/common/ui'
import Link from 'next/link'

type Props = {
  count: number
  label: string
  href: string
}

export const ProfileFollowButton = ({ count, label, href }: Props) => (
  <Button className={'p-0 text-light-100'} asChild variant="text">
    <Link href={href}>
      <div className={cn('flex flex-col text-sm')}>
        <span className={cn('font-weight700')}>{count}</span>
        <span>{label}</span>
      </div>
    </Link>
  </Button>
)
