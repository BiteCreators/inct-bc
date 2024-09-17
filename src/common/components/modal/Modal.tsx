import { ReactNode } from 'react'

import { Icon } from '@/common/components/icon/Icon'
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
          'fixed top-1/2 left-1/2 w-[90vw] max-w-md p-6 bg-white rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2'
        }
      >
        <div className={'flex justify-between items-center'}>
          <Dialog.Title className={'text-lg font-medium'}>{title}</Dialog.Title>
          <Dialog.Close className={'focus:outline-none cursor-pointer'}>
            <Icon
              className={'fill-current text-gray-500 hover:text-gray-700'}
              iconId={'close'}
              viewBox={'0 0 24 24'}
              width={'24'}
            />
          </Dialog.Close>
        </div>
        <div className={'mt-4'}>{children}</div>
      </Dialog.Content>
    </Dialog.Root>
  )
}
