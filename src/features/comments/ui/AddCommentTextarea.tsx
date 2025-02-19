import React, { ComponentProps, forwardRef, useEffect, useRef } from 'react'

import { Alert, Button, ScrollArea } from '@byte-creators/ui-kit'
import { ArrowBackOutline } from '@byte-creators/ui-kit/icons'
import { cn, mergeRefs, useTextArea } from '@byte-creators/utils'

import { useCreateComment } from '../model/useCreateComment'

type Props = {
  answerData?: {
    commentId: number
    postId: number
    userName: string
  } | null
  contentComment: string
  disabled?: boolean
  error?: null | string
  postId: string
  setContentComment: (text: string) => void
  transparent?: boolean
} & ComponentProps<'textarea'>

export const AddCommentTextarea = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      answerData,
      contentComment,
      disabled,
      error,
      id,
      onChange,
      postId,
      setContentComment,
      transparent,
      ...restProps
    }: Props,
    ref
  ) => {
    const transparentTextareaRef = useRef<HTMLTextAreaElement | null>(null)
    const { handleChange, textAreaId, textAreaRef } = useTextArea({
      autoResize: true,
      onChange,
    })

    const { apiError, handleCreateAnswerComment, handleCreateComment, isAnswer, setApiError } =
      useCreateComment({
        answerData,
        contentComment,
        postId,
        setContentComment,
      })

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContentComment(e.currentTarget.value)
      handleChange(e)
      setTimeout(() => {
        if (textAreaRef.current) {
          textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight
        }
      }, 50)
    }

    const autoResizeTextArea = () => {
      if (transparentTextareaRef.current) {
        const textarea = transparentTextareaRef.current

        textarea.style.height = `auto`
        textarea.style.height = `${Math.min(
          textarea.scrollHeight,
          4 * parseFloat(getComputedStyle(textarea).lineHeight)
        )}px`
      }
    }

    useEffect(() => {
      autoResizeTextArea()
    }, [contentComment])

    useEffect(() => {
      setTimeout(() => {
        if (textAreaRef.current) {
          textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight
        }
      }, 50)
    }, [textAreaRef])

    return (
      <div className={cn(['flex py-2 px-0', 'md:px-6', transparent ? 'p-0 md:p-0' : ''])}>
        {apiError && (
          <Alert
            message={apiError}
            onClose={() => setApiError('')}
            portal
            purpose={'toast'}
            type={'error'}
          />
        )}
        <ScrollArea className={'w-full max-h-44'} scrollbarClassName={'!bg-light-900 '}>
          <div className={'flex flex-col min-h-4 w-full'}>
            {transparent ? (
              <textarea
                className={cn(
                  'py-2 bg-transparent resize-none',
                  'outline-none outline-offset-0',
                  'min-h-[1.5em] max-h-[6em] overflow-y-auto',
                  'text-sm'
                )}
                id={id ?? textAreaId}
                onChange={handleTextAreaChange}
                placeholder={'Add a Comment...'}
                ref={transparentTextareaRef}
                rows={1}
                spellCheck={false}
                value={contentComment}
                {...restProps}
              />
            ) : (
              <textarea
                className={cn([
                  'px-2.5 py-2',
                  'outline-none outline-offset-0',
                  'text-light-100 text-md',
                  'bg-transparent',
                  'bg-dark-100',
                  'leading-tight',
                  'disabled:text-dark-100 disabled:active:border-dark-100',
                  'placeholder:text-light-900 placeholder:text-md',
                  'resize-none',
                  error && 'border-danger-500',
                ])}
                disabled={disabled}
                id={id ?? textAreaId}
                onChange={handleTextAreaChange}
                placeholder={'Add a Comment...'}
                ref={mergeRefs([ref, textAreaRef])}
                value={contentComment}
                {...restProps}
              />
            )}
            {error && <p className={'text-danger-500 text-sm'}>{error ?? 'invalid data'}</p>}
          </div>
        </ScrollArea>
        <div className={'flex items-center'}>
          <button
            className={'md:hidden ml-6 max-h-9'}
            onClick={isAnswer ? handleCreateAnswerComment : handleCreateComment}
          >
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
            disabled={!contentComment}
            onClick={isAnswer ? handleCreateAnswerComment : handleCreateComment}
            variant={'text'}
          >
            Publish
          </Button>
        </div>
      </div>
    )
  }
)
