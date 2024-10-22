import React, { JSX, useState } from 'react'

import { ImageOutline } from '@/common/assets/icons/components'
import { cn } from '@/common/lib/utils/cn'
import { Avatar, Button, Modal, TextArea, Typography } from '@/common/ui'

import exampleImage from '../../../../public/examples/image2.png'
import { useCreatePost } from '../lib/hooks/useCreatePost'
import { AspectRatio } from './AspectRatio'
import { Cropping } from './Cropping'
import { ImageControl } from './ImagesControl'

export const CreatePostModal = () => {
  const { isOpenCreatePost, setIsOpenCreatePost } = useCreatePost()
  const [step, setStep] = useState(1)
  const nameFilters = [
    'Normal',
    'Clarendon',
    'Lark',
    'Gingham',
    'Moon',
    'Clarendon',
    'Lark',
    'Gingham',
    'Moon',
  ]
  const filters: JSX.Element[] = nameFilters.map((el, index) => (
    <ImageFilter filter={el} key={index}></ImageFilter>
  ))
  let title
  let nextButtonTitle

  if (step === 1) {
    title = 'Add Photo'
  } else if (step === 2) {
    title = 'Cropping'
    nextButtonTitle = 'Next'
  } else if (step === 3) {
    title = 'Filters'
    nextButtonTitle = 'Next'
  } else {
    title = 'Publication'
    nextButtonTitle = 'Publish'
  }

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handlePublish = () => {
    setStep(1)
    setIsOpenCreatePost(false)
  }

  return (
    <div>
      <Button onClick={() => setIsOpenCreatePost(true)}>Create</Button>
      <Modal
        className={`max-w-[330px] ${
          step === 3 || step === 4 ? 'md:max-w-[984px]' : 'md:max-w-[492px]'
        } w-full min-h-64`}
        handleBack={handleBack}
        handleNext={step === 4 ? handlePublish : handleNext}
        isOpen={isOpenCreatePost}
        mode={step === 1 ? 'default' : 'withStep'}
        nextButtonTitle={nextButtonTitle}
        onOpenChange={setIsOpenCreatePost}
        title={title}
      >
        {step === 1 && (
          <div className={'w-full items-end'}>
            <div className={'w-full flex flex-col justify-center items-center'}>
              <div
                className={
                  'bg-dark-700 w-[300px] h-[300px] md:w-56 md:h-56 mt-3 md:mt-[72px] flex justify-center items-center mb-14'
                }
              >
                <ImageOutline height={48} viewBox={'0 0 24 24'} width={48} />
              </div>
              <Button className={'w-56 bottom-0 mb-7'} onClick={handleNext}>
                Select from Computer
              </Button>
              <Button className={'w-56 bottom-0 mb-12'} variant={'outline'}>
                Open Draft
              </Button>
            </div>
          </div>
        )}
        {step === 2 && (
          <>
            <div className={'h-[504px] relative'}>
              <img alt={'oops'} className={'w-full h-full'} src={exampleImage.src} />
              <div className={'w-full p-3 flex gap-6 absolute bottom-0'}>
                <AspectRatio />
                <Cropping />
                <ImageControl className={'ml-auto'} />
              </div>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <div className={'h-[504px] flex'}>
              <div className={'w-1/2'}>
                <img alt={'oops'} className={'w-full h-full'} src={exampleImage.src} />
              </div>
              <div className={'w-1/2 grid grid-cols-3 gap-x-6 gap-y-[18px] px-14 py-6'}>
                {filters}
              </div>
            </div>
          </>
        )}
        {step === 4 && (
          <>
            <div className={'h-[504px] flex'}>
              <div className={'w-1/2'}>
                <img alt={'oops'} className={'w-full h-full'} src={exampleImage.src} />
              </div>
              <div className={'w-1/2 p-6'}>
                <UserProfileUrl className={'mb-6'} />
                <TextArea
                  className={'min-h-[120px]'}
                  label={'Add publication descriptions'}
                  placeholder={'Text-area'}
                />
                <div className={'flex mx-[-24px] mt-5 mb-6'}>
                  <div className={'h-px bg-dark-100 w-full'} />
                </div>
                <span>LOCATION</span>
              </div>
            </div>
          </>
        )}
      </Modal>
    </div>
  )
}

export const ImageFilter = ({ filter }: { filter: string }) => {
  return (
    <button>
      <div className={'flex flex-col gap-2 items-center'}>
        <div className={'w-[108px] h-[108px]'}>
          <img alt={'oops'} className={'w-full h-full'} src={exampleImage.src} />
        </div>
        <Typography>{filter}</Typography>
      </div>
    </button>
  )
}

export const UserProfileUrl = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className={'w-9 h-9'}>
        <Avatar avatarURL={exampleImage.src} />
      </div>
      <Typography className={'font-medium'}>URLProfile</Typography>
    </div>
  )
}
