import { ReactNode } from 'react'
import ReactDOM from 'react-dom'

import { cn } from '@/common/lib/utils/cn'
import { ModalContent } from '@/common/ui/modal/ModalContent'
import * as Dialog from '@radix-ui/react-dialog'

type Props = {
  children: ReactNode
  className?: string
  disabledButton?: boolean
  handleBack?: () => void
  handleInteractOutside?: (e: any) => void
  handleNext?: () => void
  isOpen: boolean
  maxWidth?: string
  mode: 'custom' | 'default' | 'outside' | 'withStep'
  nextButtonTitle?: string
  onOpenChange?: (open: boolean) => void
  title?: ReactNode | string
}

export const Modal = ({
  children,
  className,
  disabledButton,
  handleBack,
  handleInteractOutside,
  handleNext,
  isOpen,
  maxWidth,
  mode,
  nextButtonTitle,
  onOpenChange,
  title,
}: Props) => {
  const modalContent = (
    <Dialog.Root onOpenChange={onOpenChange} open={isOpen}>
      <Dialog.Overlay className={cn('fixed inset-0 bg-black/50 z-30')} />
      <Dialog.Content
        className={cn(
          'z-30 fixed top-1/2 left-1/2 bg-dark-300 rounded-sm transform border border-dark-100',
          '-translate-x-1/2 -translate-y-1/2',
          maxWidth ? maxWidth : 'max-w-[480px]',
          className
        )}
        onInteractOutside={handleInteractOutside}
      >
        <ModalContent
          disabledButton={disabledButton}
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
