import React, { ComponentProps, forwardRef } from 'react'

import { cn } from '@/common/lib/utils/cn'
import { mergeRefs } from '@/common/lib/utils/mergeRefs'
import { Button, ScrollArea } from '@/common/ui'
import { useTextArea } from '@/common/ui/text-area/useTextArea'

type Props = {
  disabled?: boolean
  error?: null | string
} & ComponentProps<'textarea'>

export const AddPostTextarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ disabled, error, id, onChange }: Props, ref) => {
    const { handleChange, textAreaId, textAreaRef } = useTextArea({
      autoResize: true,
      onChange,
    })

    return (
      <div className={'flex py-3 px-6'}>
        <ScrollArea className={'w-full max-h-52'}>
          <div className={'flex flex-col min-h-4 w-full'}>
            <textarea
              className={cn([
                'pt-2 pr-2 pb-0',
                'outline-none outline-offset-0',
                'text-light-100 text-md',
                // 'bg-dark-700',
                'bg-transparent',
                'leading-none',
                'disabled:text-dark-100 disabled:active:border-dark-100',
                'placeholder:text-light-900 placeholder:text-md',
                'resize-none',
                error && 'border-danger-500',
              ])}
              disabled={disabled}
              id={id ?? textAreaId}
              onChange={handleChange}
              placeholder={'Add a Comment...'}
              ref={mergeRefs([ref, textAreaRef])}
            />
            {error && <p className={'text-danger-500 text-sm'}>{error ?? 'invalid data'}</p>}
          </div>
        </ScrollArea>
        <Button className={'max-h-9'} variant={'text'}>
          Publish
        </Button>
      </div>
    )
  }
)
