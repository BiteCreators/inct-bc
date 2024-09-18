import { ReactNode, useState } from 'react'

import { MoreHorizontal } from '@/common/assets/icons/components'
import Typography from '@/common/components/typography/Typography'
import { cn } from '@/common/utils/cn'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

type DropdownItem = {
  icon?: ReactNode
  label: string
  onClick?: () => void
}

type Props = {
  className?: string
  iconButton?: ReactNode
  items: DropdownItem[]
}

export const Dropdown = ({ className, iconButton, items }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <div className={cn('relative', className)}>
      <DropdownMenu.Root onOpenChange={setOpen} open={open}>
        <DropdownMenu.Trigger asChild>
          <button
            className={cn(
              'absolute top-0 right-0 p-2 rounded-full focus:outline-none',
              open ? 'text-primary-700' : 'text-light-100',
              'hover:text-primary-700',
              className
            )}
          >
            {iconButton ? iconButton : <MoreHorizontal />}
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align={'end'}
            className={cn(
              'bg-dark-500 min-w-40 text-white rounded-sm p-3 gap-3 border border-dark-100',
              'relative z-10',
              className
            )}
            sideOffset={5}
          >
            {items.map((item, index) => (
              <DropdownMenu.Item
                className={cn(
                  'flex items-center px-1 py-2 cursor-pointer border-none',
                  'hover:bg-dark-100 focus:bg-dark-100 focus:outline-none',
                  className
                )}
                key={index}
                onClick={item.onClick}
              >
                {item.icon && <span className={cn('mr-2', className)}>{item.icon}</span>}
                <Typography variant={'regular-text'}>{item.label}</Typography>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}
