import { Dispatch, SetStateAction } from 'react'

import { Button, Modal, Typography } from '@/common/ui'

type Props = {
  bodyText: string
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  title: string
}

export const LinkSentModal = ({ bodyText, isOpen, setIsOpen, title }: Props) => {
  return (
    <Modal isOpen={isOpen} mode={'default'} onOpenChange={setIsOpen} title={title}>
      <div className={'flex flex-col gap-[18px] pb-6 pt-[18px]'}>
        <Typography>{bodyText}</Typography>
        <Button className={'self-end w-[96px]'} onClick={() => setIsOpen(false)}>
          Ok
        </Button>
      </div>
    </Modal>
  )
}
