import * as React from 'react'

import { CurrentUserTabs } from '@/widgets/current-user-tabs/ui/CurrentUserTabs'
import { ArrowBackOutline } from '@packages/shared/assets'
import { Avatar, Typography } from '@packages/shared/ui'

import cl from './styles/CurrentUser.module.scss'

type Props = {}
export const CurrentUser = ({}: Props) => {
  return (
    <div className={cl.currentUserContainer}>
      <div className={cl.back}>
        <button>
          <ArrowBackOutline />
        </button>
        <Typography>Back to Users List</Typography>
      </div>
      <div className={cl.nameAndPhotoContainer}>
        <Avatar
          avatarURL={'https://www.w3schools.com/w3css/img_avatar3.png'}
          className={cl.avatar}
        />
        <div>
          <Typography variant={'h1'}>Name Surname</Typography>
          <Typography className={cl.username} variant={'regular-link'}>
            username
          </Typography>
        </div>
      </div>
      <div className={cl.userInfoContainer}>
        <div className={cl.userInfo}>
          <Typography className={cl.lightText}>UserID</Typography>
          <Typography variant={'medium-text'}>21331QErQe21</Typography>
        </div>
        <div className={cl.userInfo}>
          <Typography className={cl.lightText}>Profile Creation Date</Typography>
          <Typography variant={'medium-text'}>12.12.2022</Typography>
        </div>
      </div>
      <CurrentUserTabs />
    </div>
  )
}
