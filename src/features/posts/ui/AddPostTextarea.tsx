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
      <div className={'flex -mx-2 mt-3'}>
        <ScrollArea className={'w-full max-h-[300px]'}>
          <div className={'flex flex-col min-h-4 w-full'}>
            <textarea
              className={cn([
                'pt-2 pr-2 -mb-4',
                'outline-none outline-offset-0',
                'text-light-100 text-md',
                // 'bg-dark-700',
                'bg-transparent',
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
