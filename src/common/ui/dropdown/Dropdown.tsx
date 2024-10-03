import { ReactNode, useState } from 'react'

import { MoreHorizontal } from '@/common/assets/icons/components'
import { cn } from '@/common/lib/utils/cn'
import { DropdownContent } from '@/common/ui/dropdown/DropdownContent'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { motion } from 'framer-motion'

export type DropdownItem = {
  icon?: ReactNode
  label: string
  onClick?: () => void
}

type Props = {
  children?: ReactNode
  className?: string
  iconButton?: ReactNode
  items?: DropdownItem[]
}

export const Dropdown = ({ children, className, iconButton, items }: Props) => {
  const [open, setOpen] = useState(false)

  const variants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.1,
        ease: [0.4, 0, 0.2, 1],
      },
      translateY: -20,
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.1,
        ease: [0.4, 0, 0.2, 1],
      },
      translateY: 0,
    },
  }

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
          {open && (
            <DropdownMenu.Content align={'end'} asChild forceMount sideOffset={5}>
              <motion.div
                animate={'open'}
                className={cn(
                  'bg-dark-500 min-w-40 text-white rounded-sm p-3 gap-3 border border-dark-100',
                  'relative z-10',
                  className
                )}
                initial={'closed'}
                variants={variants}
              >
                <DropdownContent content={items || children} />
              </motion.div>
            </DropdownMenu.Content>
          )}
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}
