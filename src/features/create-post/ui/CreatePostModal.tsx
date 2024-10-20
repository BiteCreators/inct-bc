import React, { JSX, useEffect, useRef, useState } from 'react'

import {
  ExpandOutline,
  HorizontalOrientation,
  ImageOutline,
  MaximizeOutline,
  Square,
  VerticalOrientation,
} from '@/common/assets/icons/components'
import { cn } from '@/common/lib/utils/cn'
import { Avatar, Button, Modal, TextArea, Typography } from '@/common/ui'

import exampleImage from '../../../../public/examples/image2.png'

export const CreatePostModal = () => {
  const [isOpenCreatePost, setIsOpenCreatePost] = useState(false)
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
              <Button className={'w-56 bottom-0 mb-7'}>Select from Computer</Button>
              <Button className={'w-56 bottom-0 mb-12'} variant={'outline'}>
                Open Draft
              </Button>
              <Button onClick={handleNext}>next</Button>
            </div>
          </div>
        )}
        {step === 2 && (
          <>
            <div className={'h-[504px] relative'}>
              <img alt={'oops'} className={'w-full h-full'} src={exampleImage.src} />
              <div className={'w-full p-3 flex gap-6 absolute bottom-0'}>
                <AspectRatio />

                <Button variant={'icon'}>
                  <MaximizeOutline />
                </Button>

                <div className={'flex-1 text-right'}>
                  <Button variant={'icon'}>
                    <ImageOutline />
                  </Button>
                </div>
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

export const AspectRatio = () => {
  const [isAspectRatioOpen, setIsAspectRatioOpen] = useState(false)
  const aspectRatioRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (aspectRatioRef.current && !aspectRatioRef.current.contains(event.target as Node)) {
        setIsAspectRatioOpen(false)
      }
    }

    if (isAspectRatioOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isAspectRatioOpen])

  return (
    <div className={'relative'} ref={aspectRatioRef}>
      <Button
        className={`${isAspectRatioOpen && 'focus:text-primary-500'}`}
        onClick={() => setIsAspectRatioOpen(!isAspectRatioOpen)}
        variant={'icon'}
      >
        <ExpandOutline />
      </Button>
      {isAspectRatioOpen && (
        <div
          className={`flex flex-col gap-3 min-w-36 absolute bottom-[38px] bg-dark-500 bg-opacity-80 p-3 rounded-sm`}
        >
          <button className={'flex gap-7 justify-between items-center'}>
            <span>Original</span>
            <ImageOutline />
          </button>
          <button className={'flex gap-7 justify-between items-center'}>
            <span>1:1</span>
            <Square />
          </button>
          <button className={'flex gap-7 justify-between items-center'}>
            <span>4:5</span>
            <VerticalOrientation />
          </button>
          <button className={'flex gap-7 justify-between items-center'}>
            <span>16:9</span>
            <HorizontalOrientation />
          </button>
        </div>
      )}
    </div>
  )
}
