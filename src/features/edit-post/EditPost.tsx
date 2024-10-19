import React from 'react'

import { Modal } from '@/common/ui'
import Image from 'next/image'

type Props = {
  isOpen: boolean
}
export default function EditPost(props: Props) {
  return (
    <Modal
      className={'h-[560px] max-w-[970px] '}
      isOpen={props.isOpen}
      mode={'default'}
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
        <div className={'w-1/2 h-full bg-blue-300'}></div>
      </div>
    </Modal>
  )
}
