import React from 'react'

import { Button, Modal, TextArea } from '@/common/ui'
import { ActionConfirmation } from '@/common/ui/action-confirmation/ActionComfiirmation'
import { UserProfile } from '@/entities/profile'
import { useEditPost } from '@/features/posts/edit-post/lib/useEditPost'

type Props = {
  avatarUrl?: string
  changeOpen: (e: boolean) => void
  isOpen: boolean
  postText?: string
  profileId?: number
  userName?: string
}

export const EditPost = ({
  avatarUrl = 'https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676295806139337963.png',
  changeOpen,
  isOpen,
  postText = 'text text text',
  profileId = 1111,
  userName = 'default',
}: Props) => {
  const {
    changeModalState,
    confirmOpen,
    correct,
    handleChange,
    handleConfirm,
    handleReject,
    limit,
    saveChanges,
    setConfirmOpen,
    value,
  } = useEditPost({ changeOpen, postText })

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
        className={'h-[565px] max-w-[960px]'}
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
                <UserProfile
                  avatarUrl={avatarUrl ?? undefined}
                  profileId={profileId}
                  userName={userName}
                />
              </div>
              <TextArea
                className={'min-h-32 max-h-72'}
                isCorrect={correct}
                label={'Add publication descriptions'}
                limitCount={limit}
                onChange={handleChange}
                value={value}
              />
            </div>
            <div className={'flex w-full h-2/3 justify-end items-end py-5 '}>
              <Button disabled={!correct} onClick={saveChanges}>
                Save changes
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
