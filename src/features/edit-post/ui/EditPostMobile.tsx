import { ReactNode } from 'react'

import { Post } from '@/entities/posts'
import { useEditPost } from '@/features/edit-post/model/useEditPost'
import {
  ActionConfirmation,
  Alert,
  Button,
  LoaderBlock,
  Modal,
  Slider,
  TextArea,
  Typography,
  UserProfile,
} from '@byte-creators/ui-kit'
import { cn, useScopedTranslation } from '@byte-creators/utils'

type Props = {
  changeEditMode: (e: boolean) => void
  isOpen: boolean
  post: Post | undefined
  slides: ReactNode[]
}

export const EditPostMobile = ({ changeEditMode, isOpen, post, slides }: Props) => {
  const {
    apiError,
    changeModalState,
    confirmOpen,
    correct,
    handleChange,
    handleConfirm,
    handleReject,
    isSSRPostLoading,
    limit,
    saveChanges,
    setConfirmOpen,
    t,
    tProfile,
    value,
  } = useEditPost({ changeEditMode, postText: post ? post.description : 'No description' })

  return (
    <>
      <ActionConfirmation
        isOpen={confirmOpen}
        message={t.doYouWantToCloseEditing}
        onConfirm={handleConfirm}
        onReject={handleReject}
        setIsOpen={setConfirmOpen}
        title={t.closeEditing}
      />
      {apiError && (
        <Alert className={'z-50'} message={apiError} portal purpose={'toast'} type={'error'} />
      )}
      <div className={cn(['-my-8 flex items-center px-4 pb-12 max-w-[500px] mx-auto'])}>
        {isSSRPostLoading && <LoaderBlock />}
        <div className={'flex flex-col'}>
          <div className={'flex justify-between pb-4 pt-2'}>
            <Button className={'text-light-100 px-0'} onClick={changeModalState} variant={'text'}>
              {t.cropCancel}
            </Button>
            <Typography className={'text-center px-2'} variant={'h2'}>
              {t.editPost}
            </Typography>
            <Button className={'px-0'} disabled={!correct} onClick={saveChanges} variant={'text'}>
              {tProfile.save}
            </Button>
          </div>
          <div className={'mx-3'}>
            <Slider height={'264'} slides={slides} />
          </div>
          <div className={'h-full mt-6'}>
            <div className={'flex w-full h-1/3 flex-col '}>
              <div className={'flex w-full justify-start items-center gap-5 mb-6'}>
                {post ? (
                  <UserProfile
                    avatarUrl={post.avatarOwner ?? undefined}
                    profileId={post?.id}
                    userName={post?.userName}
                  />
                ) : (
                  'Post no found'
                )}
              </div>
              <TextArea
                className={'max-h-24'}
                isCorrect={correct}
                label={'Add publication descriptions'}
                limitCount={limit}
                onChange={handleChange}
                value={value}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
