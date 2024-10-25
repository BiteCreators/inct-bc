import { ReactNode } from 'react'

import { ArrowIosBack, Close } from '@/common/assets/icons/components'
import { cn } from '@/common/lib/utils/cn'
import * as Dialog from '@radix-ui/react-dialog'

import { Button } from '../button/Button'

type Props = {
  children?: ReactNode
  handleBack?: () => void
  handleNext?: () => void
  mode: 'custom' | 'default' | 'outside' | 'withStep'
  nextButtonTitle?: string
  title?: string
}

export const ModalContent = ({
  children,
  handleBack,
  handleNext,
  mode,
  nextButtonTitle,
  title,
}: Props) => {
  return (
    <>
      {mode === 'default' && (
        <>
          <div className={cn('flex justify-between items-center py-3 px-6')}>
            <Dialog.Title className={cn('text-xl font-bold')}>{title}</Dialog.Title>
            <Dialog.Close className={cn('focus:outline-none cursor-pointer')}>
              <Close className={cn('fill-current text-light-100')} />
            </Dialog.Close>
          </div>
          <div className={cn('h-px bg-dark-100 w-full')} />
          <div className={cn('py-3 px-6')}>{children}</div>
        </>
      )}

      {mode === 'outside' && (
        <>
          <div className={cn('relative')}>
            <Dialog.Close
              className={cn('absolute -top-14 -right-14 m-5 focus:outline-none cursor-pointer')}
            >
              <Close className={cn('fill-current text-light-100')} />
            </Dialog.Close>
            <div>
              <Dialog.Title className={cn('text-xl font-bold px-4 py-3')}>{title}</Dialog.Title>
              <div className={cn('h-px bg-dark-100 w-full')} />
              <div className={cn('py-3 px-6')}>{children}</div>
            </div>
          </div>
        </>
      )}

      {mode === 'withStep' && (
        <>
          <div className={'flex justify-between items-center py-3 px-6'}>
            <div className={'flex-1'}>
              <Button
                className={'text-white pl-0 focus:outline-0'}
                onClick={handleBack}
                variant={'text'}
              >
                <ArrowIosBack />
              </Button>
            </div>
            <div className={'text-xl font-bold flex-1 text-center'}>{title}</div>
            <div className={'flex-1 text-right'}>
              <Button
                className={'font-semibold focus:outline-0'}
                onClick={handleNext}
                variant={'text'}
              >
                {nextButtonTitle}
              </Button>
            </div>
          </div>
          <div className={'h-px bg-dark-100 w-full'} />
          <div>{children}</div>
        </>
      )}

      {mode === 'custom' && <div className={cn('relative')}>{children}</div>}
    </>
  )
}
