import React, { useRef, useState } from 'react'

import { Avatar, Button } from '@/common/ui'
import { ModalAvatar } from '@/features/profile/avatar-module/ModalAvatar'

import 'react-image-crop/dist/ReactCrop.css'

export const AvatarModule = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState('')

  const updateAvatar = (imgSrc: any) => {
    setAvatarUrl(imgSrc)
  }

  return (
    <div className={'bg-dark-700 w-1/5 min-w-56 flex flex-col items-center gap-5 p-2'}>
      <Avatar avatarURL={avatarUrl} isNextLink={false} showClose={!!avatarUrl} size={200} />
      <Button className={'w-full'} onClick={() => setIsOpen(true)} variant={'outline'}>
        Add a Profile Photo
      </Button>

      {isOpen && <ModalAvatar isOpen={isOpen} setIsOpen={setIsOpen} updateAvatar={updateAvatar} />}
    </div>
  )
}
