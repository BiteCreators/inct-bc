import React from 'react'

import { Alert, Button, Loader, Modal, TextArea } from '@/common/ui'
import { ActionConfirmation } from '@/common/ui/action-confirmation/ActionComfiirmation'
import { LoaderBlock } from '@/common/ui/loader/LoaderBlock'
import { Slider } from '@/common/ui/slider/Slider'
import { Post } from '@/entities/posts/types/post.type'
import { UserProfile } from '@/entities/profile'
import { useEditPost } from '@/features/edit-post/model/useEditPost'

type Props = {
  changeEditMode: (e: boolean) => void
  isOpen: boolean
  post: Post
  slidesUrl: string[]
}

export const EditPost = ({ changeEditMode, isOpen, post, slidesUrl }: Props) => {
  const {
    apiError,
    changeModalState,
    confirmOpen,
    correct,
    handleChange,
    handleConfirm,
    handleReject,
    isLoading,
    limit,
    saveChanges,
    setConfirmOpen,
    value,
  } = useEditPost({ changeEditMode, postText: post?.description })

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
      {<Alert className={'z-50'} message={apiError} portal purpose={'toast'} type={'error'} />}
      <Modal
        className={'h-[565px] max-w-[960px]'}
        isOpen={isOpen}
        mode={'default'}
        onOpenChange={changeModalState}
        title={'Edit post'}
      >
        {isLoading && <LoaderBlock />}
        <div className={'w-[920px] h-[460px] flex flex-row'}>
          <div className={'w-1/2 h-full bg-amber-200'}>
            <Slider
              height={'full'}
              slidesUrl={slidesUrl}
              stylesSlider={'max-w-[500px] min-w-[390px]'}
            />
          </div>
          <div className={'w-1/2 h-full pl-4'}>
            <div className={'flex w-full h-1/3 flex-col '}>
              <div className={'flex w-full justify-start items-center gap-5 mb-6'}>
                <UserProfile
                  avatarUrl={post.avatarOwner ?? undefined}
                  profileId={post?.id}
                  userName={post?.userName}
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
