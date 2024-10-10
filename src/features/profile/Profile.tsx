import React from 'react'

import { AvatarModule } from '@/features/profile/avatar-module/AvatarModule'

export const Profile = () => {
  return (
    <div className={'bg-danger-100 w-full h-[80vh] flex'}>
      <AvatarModule></AvatarModule>
    </div>
  )
}
