import * as React from 'react'
import { ReactNode } from 'react'

import { cn } from '@/common/lib/utils/cn'
import { Typography } from '@/common/ui'
import { DropdownItem } from '@/common/ui/dropdown/Dropdown'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

type Props = {
  content: DropdownItem[] | ReactNode
}

export const DropdownContent = ({ content }: Props) => {
  if (Array.isArray(content)) {
    return (
      <>
        {content.map((item, index) => (
          <DropdownMenu.Item
            className={cn(
              'flex items-center px-1 py-2 cursor-pointer border-none',
              'global-hover:hover:bg-dark-100 rounded-sm focus:bg-dark-100 focus:outline-none'
            )}
            key={index}
            onClick={item.onClick}
          >
            {item.icon && <span className={cn('mr-2')}>{item.icon}</span>}
            <Typography variant={'regular-text'}>{item.label}</Typography>
          </DropdownMenu.Item>
        ))}
      </>
    )
  }

  return <>{content}</>
}
