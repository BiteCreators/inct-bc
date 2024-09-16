import { ReactNode, useState } from 'react'

import { Icon } from '@/common/components/icon/Icon'
import { cn } from '@/common/utils/cn'
import * as Dialog from '@radix-ui/react-dialog'

type Action = {
  icon: string
  label: string
  onClick: () => void
}

type Props = {
  children: ReactNode
  triggerIcon?: string
}

export const Modal = ({ children, triggerIcon }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog.Root onOpenChange={setIsOpen} open={isOpen}>
      <Dialog.Trigger asChild>
        <span className={'relative flex items-center justify-end'}>
          <button
            className={cn([
              'focus:outline-none cursor-pointer fill-current p-2',
              isOpen ? 'text-primary-700' : 'text-light-100',
            ])}
          >
            <Icon iconId={triggerIcon || 'more-horizontal'} viewBox={'0 -8 30 40'} width={'30'} />
          </button>
        </span>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Content
          className={'absolute right-8 p-4 bg-dark-500 rounded-sm border border-dark-100 '}
        >
          <div className={'gap-3'}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
