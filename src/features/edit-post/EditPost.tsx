import React, { ChangeEvent, useState } from 'react'

import { Avatar, Button, Modal, TextArea, Typography } from '@/common/ui'
import Image from 'next/image'

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
  const [textAreaText, setTextAreaText] = useState<string>(postText)
  const changeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaText(postText)
  }
  const saveChanges = () => {
    // textAreaText=>save
    changeOpen(false)
  }

  return (
    <Modal
      className={'h-[560px] max-w-[970px] '}
      isOpen={isOpen}
      mode={'default'}
      onOpenChange={changeOpen}
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
              label={'Add publication descriptions'}
              onChange={changeText}
            >
              {textAreaText}
            </TextArea>
          </div>
          <div className={'flex w-full h-2/3 justify-end items-end py-5 '}>
            <Button className={'max-h-screen'} onClick={saveChanges}>
              Save changes
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
