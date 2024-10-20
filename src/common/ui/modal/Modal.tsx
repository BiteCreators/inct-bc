import { ReactNode } from 'react'
import ReactDOM from 'react-dom'

import { cn } from '@/common/lib/utils/cn'
import { ModalContent } from '@/common/ui/modal/ModalContent'
import * as Dialog from '@radix-ui/react-dialog'

type Props = {
  children: ReactNode
  className?: string
  handleBack?: () => void
  handleNext?: () => void
  isOpen: boolean
  mode: 'custom' | 'default' | 'outside' | 'withStep'
  nextButtonTitle?: string
  onOpenChange?: (open: boolean) => void
  title?: string
}

export const Modal = ({
  children,
  className,
  handleBack,
  handleNext,
  isOpen,
  mode,
  nextButtonTitle,
  onOpenChange,
  title,
}: Props) => {
  const modalContent = (
    <Dialog.Root onOpenChange={onOpenChange} open={isOpen}>
      <Dialog.Overlay className={cn('fixed inset-0 bg-black/50 z-50')} />
      <Dialog.Content
        className={cn(
          'z-50 fixed top-1/2 left-1/2 max-w-md bg-dark-300 rounded-sm transform border border-dark-100',
          '-translate-x-1/2 -translate-y-1/2',
          className
        )}
      >
        <ModalContent
          handleBack={handleBack}
          handleNext={handleNext}
          mode={mode}
          nextButtonTitle={nextButtonTitle}
          title={title}
        >
          {children}
        </ModalContent>
      </Dialog.Content>
    </Dialog.Root>
  )

  return ReactDOM.createPortal(modalContent, document.body)
}
