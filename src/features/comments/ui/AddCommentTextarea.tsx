import React, { ComponentProps, forwardRef, useEffect, useState } from 'react'

import { ArrowBackOutline } from '@/common/assets/icons/components'
import { cn } from '@/common/lib/utils/cn'
import { mergeRefs } from '@/common/lib/utils/mergeRefs'
import { Button, ScrollArea } from '@/common/ui'
import { useTextArea } from '@/common/ui/text-area/useTextArea'
import { commentsApi } from '@/entities/comments'

type Props = {
  disabled?: boolean
  error?: null | string
  postId: string
} & ComponentProps<'textarea'>

export const AddCommentTextarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ disabled, error, id, onChange, postId }: Props, ref) => {
    const [content, setContent] = useState<string>()

    const { handleChange, textAreaId, textAreaRef } = useTextArea({
      autoResize: true,
      onChange,
    })
    const [createComment] = commentsApi.useCreateCommentMutation()

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.currentTarget.value)
      handleChange(e)
      setTimeout(() => {
        if (textAreaRef.current) {
          textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight
        }
      }, 50)
    }

    const handleCreateComment = async () => {
      try {
        if (content) {
          await createComment({ content, postId })
          setContent('')
        }
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      setTimeout(() => {
        if (textAreaRef.current) {
          textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight
        }
      }, 50)
    }, [textAreaRef])

    return (
      <div className={cn(['flex py-3 px-0', 'md:px-6'])}>
        <ScrollArea className={'w-full max-h-44'}>
          <div className={'flex flex-col min-h-4 w-full'}>
            <textarea
              className={cn([
                'pt-2 pr-2.5 pb-0',
                'outline-none outline-offset-0',
                'text-light-100 text-md',
                'bg-transparent',
                // 'bg-dark-100',
                'leading-none',
                'disabled:text-dark-100 disabled:active:border-dark-100',
                'placeholder:text-light-900 placeholder:text-md',
                'resize-none',
                error && 'border-danger-500',
              ])}
              value={content}
              disabled={disabled}
              id={id ?? textAreaId}
              onChange={handleTextAreaChange}
              placeholder={'Add a Comment...'}
              ref={mergeRefs([ref, textAreaRef])}
            />
            {error && <p className={'text-danger-500 text-sm'}>{error ?? 'invalid data'}</p>}
          </div>
        </ScrollArea>
        <div className={'flex items-end mb-2'}>
          <button className={'md:hidden ml-6 max-h-9'}>
            <ArrowBackOutline
              className={'text-dark-900 bg-light-100 rounded-full'}
              height={20}
              style={{ transform: 'rotate(90deg)' }}
              viewBox={'0 0 24 24'}
              width={20}
            />
          </button>
          <Button
            className={cn(['max-h-9 align-bottom ml-6 hidden', 'md:inline-block'])}
            variant={'text'}
            onClick={handleCreateComment}
            disabled={!content}
          >
            Publish
          </Button>
        </div>
      </div>
    )
  }
)
