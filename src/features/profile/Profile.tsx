import React from 'react'

import { ProfileAvatar } from '@/features/profile/avatar-module/ProfileAvatar'

export const Profile = () => {
  return (
    <div className={'bg-danger-100 w-full h-[80vh] flex'}>
      <ProfileAvatar></ProfileAvatar>
    </div>
  )
}
