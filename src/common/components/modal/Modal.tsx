import { ReactNode } from 'react'

import { ModalContent } from '@/common/components/modal/ModalContent'
import { cn } from '@/common/utils/cn'
import * as Dialog from '@radix-ui/react-dialog'

type Props = {
  children: ReactNode
  isOpen: boolean
  mode: 'custom' | 'default' | 'outside'
  onOpenChange?: (open: boolean) => void
  title?: string
}

export const Modal = ({ children, isOpen, mode, onOpenChange, title }: Props) => {
  return (
    <Dialog.Root onOpenChange={onOpenChange} open={isOpen}>
      <Dialog.Overlay className={cn('fixed inset-0 bg-black/50')} />
      <Dialog.Content
        className={cn(
          'fixed top-1/2 left-1/2 max-w-md bg-dark-300 rounded-sm transform border border-dark-100',
          '-translate-x-1/2 -translate-y-1/2'
        )}
      >
        <ModalContent mode={mode} title={title}>
          {children}
        </ModalContent>
      </Dialog.Content>
    </Dialog.Root>
  )
}