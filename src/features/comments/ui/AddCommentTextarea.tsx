import React, { ComponentProps, forwardRef } from 'react'

import { Alert, Button, TextArea } from '@byte-creators/ui-kit'
import { ArrowBackOutline } from '@byte-creators/ui-kit/icons'
import { cn, mergeRefs, useScopedTranslation, useTextArea } from '@byte-creators/utils'

import { useCreateComment } from '../model/useCreateComment'

type Props = {
  answerData?: {
    commentId: number
    postId: number
    userName: string
  } | null
  contentComment: string
  correct?: boolean
  disabled?: boolean
  limit?: number
  postId: string
  setContentComment: (text: string) => void
  transparent?: boolean
} & ComponentProps<'textarea'>

export const AddCommentTextarea = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      answerData,
      contentComment,
      correct,
      disabled,
      limit,
      onChange,
      postId,
      setContentComment,
      transparent,
    }: Props,
    ref
  ) => {
    const t = useScopedTranslation('Posts')
    const { handleChange, textAreaRef } = useTextArea({
      autoResize: true,
      onChange,
    })

    const { error, handleCreateAnswerComment, handleCreateComment, isAnswer } = useCreateComment({
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

    return (
      <div className={cn(['flex py-2 px-0', 'md:px-6', transparent && 'md:px-0'])}>
        <div className={'w-full h-auto'}>
          <TextArea
            className={cn([
              'text-light-100 text-md bg-dark-100 leading-tight max-h-32',
              transparent ? 'bg-transparent border-none h-9 px-0' : '',
            ])}
            disabled={disabled}
            isCorrect={correct}
            limitCount={limit}
            maxLength={limit}
            onChange={handleTextAreaChange}
            placeholder={t.addComment}
            ref={mergeRefs([ref, textAreaRef])}
            rows={transparent ? 1 : undefined}
            value={contentComment}
          />
        </div>
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
          <div className={'relative whitespace-nowrap'}>
            <Button
              className={cn(['max-h-9 align-bottom ml-6 hidden', 'md:inline-block'])}
              disabled={!contentComment}
              onClick={isAnswer ? handleCreateAnswerComment : handleCreateComment}
              variant={'text'}
            >
              {t.publish}
            </Button>
            {error && (
              <Alert
                className={'!-translate-x-36'}
                message={error}
                purpose={'toast'}
                type={'error'}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
)
