import React from 'react'

import { cn } from '@/common/lib/utils/cn'
import { Button, Modal } from '@/common/ui'

type Props = {
  isOpen: boolean
  message: string
  title: string
}

export const ActionConfirmation = ({
  isOpen = false,
  message = 'test message with questiont 2 line i hope test message with questiont 2 line i hope',
  title = 'test Title',
}: Props) => {
  const confirm = () => {}
  const reject = () => {}

  return (
    <Modal isOpen={isOpen} mode={'default'} title={title}>
      <div className={'calc(min-w-[430px]-40px) flex mb-4'}>{message}</div>
      <div className={'w-full flex gap-5 mb-6 items-center justify-end'}>
        <Button className={'h-[37px]'} onClick={confirm} variant={'outline'}>
          Да
        </Button>
        <Button>Нет</Button>
      </div>
    </Modal>
  )
}
