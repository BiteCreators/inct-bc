import { ReactNode } from 'react'

import { Close } from '@/common/assets/icons/components'
import * as Dialog from '@radix-ui/react-dialog'

type Props = {
  children: ReactNode
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title: string
}

export const Modal = ({ children, isOpen, onOpenChange, title }: Props) => {
  return (
    <Dialog.Root onOpenChange={onOpenChange} open={isOpen}>
      <Dialog.Overlay className={'fixed inset-0 bg-black/50'} />
      <Dialog.Content
        className={
          'fixed top-1/2 left-1/2 max-w-md bg-dark-300 rounded-sm transform border border-dark-100' +
          ' -translate-x-1/2 -translate-y-1/2'
        }
      >
        <div className={'flex justify-between items-center py-3 px-6'}>
          <Dialog.Title className={'text-xl font-bold'}>{title}</Dialog.Title>
          <Dialog.Close className={'focus:outline-none cursor-pointer'}>
            <Close className={'fill-current text-light-100'} />
          </Dialog.Close>
        </div>
        <div className={'h-px bg-dark-100 w-full'}></div>
        <div className={'py-3 px-6'}>{children}</div>
      </Dialog.Content>
    </Dialog.Root>
  )
}
