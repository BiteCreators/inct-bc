import React, { useState } from 'react'

import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import { cn } from '@/common/lib/utils/cn'
import { Button, Modal } from '@/common/ui'

type Props = {
  isOpen: boolean
  message: string
  onConfirm: () => void
  onReject: () => void
  setIsOpen: (isOpen: boolean) => void
  title: string
}

export const ActionConfirmation = ({
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
      <div className={'calc(min-w-[430px]-40px) flex mb-4'}>{message}</div>
      <div className={'w-full flex gap-5 mb-6 items-center justify-end'}>
        <Button className={'h-[37px]'} onClick={handleConfirm} variant={'outline'}>
          {t.yes}
        </Button>
        <Button onClick={handleReject}>{t.no}</Button>
      </div>
    </Modal>
  )
}
