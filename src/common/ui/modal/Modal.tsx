import { ReactNode } from 'react'

import { cn } from '@/common/lib/utils/cn'
import { ModalContent } from '@/common/ui/modal/ModalContent'
import * as Dialog from '@radix-ui/react-dialog'

type Props = {
  children: ReactNode
  className?: string
  isOpen: boolean
  mode: 'custom' | 'default' | 'outside'
  onOpenChange?: (open: boolean) => void
  title?: string
}

export const Modal = ({ children, className, isOpen, mode, onOpenChange, title }: Props) => {
  return (
    <Dialog.Root onOpenChange={onOpenChange} open={isOpen}>
      <Dialog.Overlay className={cn('fixed inset-0 bg-black/50')} />
      <Dialog.Content
        className={cn(
          'fixed top-1/2 left-1/2 max-w-md bg-dark-300 rounded-sm transform border border-dark-100',
          '-translate-x-1/2 -translate-y-1/2',
          className
        )}
      >
        <ModalContent mode={mode} title={title}>
          {children}
        </ModalContent>
      </Dialog.Content>
    </Dialog.Root>
  )
}
