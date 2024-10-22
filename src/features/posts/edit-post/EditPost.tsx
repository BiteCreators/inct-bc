import React, { ChangeEvent, useState } from 'react'

import { postsApi } from '@/common/api/posts.api'
import { Avatar, Button, Modal, TextArea, Typography } from '@/common/ui'
import { ActionConfirmation } from '@/common/ui/action-confirmation/ActionComfiirmation'
import { useConfirmation } from '@/common/ui/action-confirmation/useConfirmation'
import { useValidationLimit } from '@/features/posts/edit-post/useValidationLimit'
import { useParams } from 'next/navigation'

type Props = {
  changeOpen: (e: boolean) => void
  isOpen: boolean
  postText?: string
  urlProfile?: string
}

export default function EditPost({
  changeOpen,
  isOpen,
  postText = 'text text text',
  urlProfile = 'default url',
}: Props) {
  const params = useParams()
  const postId = Number(params?.id) ?? null

  const [textAreaText, setTextAreaText] = useState<string>(postText)
  const [updatePost] = postsApi.useUpdatePostMutation()
  const changeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaText(e.target.value)
  }

  const { correct, limit } = useValidationLimit(textAreaText, 500)
  const saveChanges = () => {
    updatePost({ description: textAreaText, postId })
    changeOpen(false)
  }
  const { confirmOpen, handleConfirm, handleReject, requestConfirmation, setConfirmOpen } =
    useConfirmation()
  const changeModalState = async () => {
    if (textAreaText === postText) {
      changeOpen(false)

      return
    }
    setConfirmOpen(true)
    const isConfirmed = await requestConfirmation()

    changeOpen(!isConfirmed)
    setConfirmOpen(false)
  }

  return (
    <>
      <ActionConfirmation
        isOpen={confirmOpen}
        message={
          'Do you really want to close the edition of the publication? If you close changes won’t be saved'
        }
        onConfirm={handleConfirm}
        onReject={handleReject}
        setIsOpen={setConfirmOpen}
        title={'Close Post'}
      />
      <Modal
        className={'h-[565px] max-w-[960px] z-[1000] '}
        isOpen={isOpen}
        mode={'default'}
        onOpenChange={changeModalState}
        title={'Edit post'}
      >
        <div className={'w-[920px] h-[465px] flex flex-row'}>
          <div className={'w-1/2 h-full bg-amber-200'}>
            <img
              alt={'img'}
              className={'w-full h-full object-cover '}
              src={'https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676295806139337963.png'}
            />
          </div>
          <div className={'w-1/2 h-full pl-4'}>
            <div className={'flex w-full h-1/3 flex-col '}>
              <div className={'flex w-full justify-start items-center gap-5 mb-6'}>
                <Avatar
                  avatarURL={
                    'https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676295806139337963.png'
                  }
                  imgStyles={'w-9 h-9'}
                />
                <Typography className={'font-bold'} variant={'medium-text'}>
                  {urlProfile}
                </Typography>
              </div>
              <TextArea
                className={'min-h-32'}
                isCorrect={correct}
                label={'Add publication descriptions'}
                limitCount={limit}
                onChange={changeText}
                value={textAreaText}
              />
            </div>
            <div className={'flex w-full h-2/3 justify-end items-end py-5 '}>
              <Button className={'max-h-screen'} disabled={!correct} onClick={saveChanges}>
                Save changes
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
