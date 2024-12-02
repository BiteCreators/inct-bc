import React, { ReactNode } from 'react'

import { Button, Modal } from '..'
import { useScopedTranslation } from '../../hooks'
import { cn } from '../../utils/'

type Props = {
  children?: ReactNode
  classNameButtons?: string
  classNameMessage?: string
  isOpen: boolean
  message: ReactNode | string
  onConfirm: () => void
  onReject: () => void
  setIsOpen: (isOpen: boolean) => void
  title: string
}

export const ActionConfirmation = ({
  children,
  classNameButtons,
  classNameMessage,
  isOpen = false,
  message = 'test message with question',
  onConfirm,
  onReject,
  setIsOpen,
  title = 'test Title',
}: Props) => {
  const t = useScopedTranslation('Common')
  const handleConfirm = () => {
    onConfirm()
    setIsOpen(false)
  }

  const handleReject = () => {
    onReject()
    setIsOpen(false)
  }

  return (
    <Modal isOpen={isOpen} mode={'default'} onOpenChange={setIsOpen} title={title}>
      <div className={cn('calc(min-w-[430px]-40px) flex mb-4', classNameMessage)}>{message}</div>
      {children}
      <div className={cn('w-full flex gap-5 mb-6 items-center justify-end', classNameButtons)}>
        <Button className={'h-[37px]'} onClick={handleConfirm} variant={'outline'}>
          {t.yes}
        </Button>
        <Button onClick={handleReject}>{t.no}</Button>
      </div>
    </Modal>
  )
}
