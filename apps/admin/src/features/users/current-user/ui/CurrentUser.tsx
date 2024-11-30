import * as React from 'react'

import { formatDate } from '@/features/users/current-user/lib/utils/formatDate'
import { useGetUser } from '@/features/users/current-user/model/useGetUser'
import { CurrentUserTabs } from '@/widgets/current-user-tabs/ui/CurrentUserTabs'
import { ArrowBackOutline } from '@packages/shared/assets'
import { Alert, Avatar, Loader, Typography } from '@packages/shared/ui'

import cl from './styles/CurrentUser.module.scss'

type Props = {}
export const CurrentUser = ({}: Props) => {
  // const router = useRouter()
  // const { id } = router.query
  const id = 1435 //todo: remove mock
  const { data, error, loading } = useGetUser(Number(id))
  const user = data?.getUser

  const exampleImg =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ6th-oTbkDMbDOPGU_kkRMM55lfvRYgM8JA&s'
  //todo: remove mock

  if (loading) {
    return <Loader />
  }
  if (!user) {
    return <Alert message={'User not found'} type={'error'} />
  }

  return (
    <div className={cl.currentUserContainer}>
      <div className={cl.back}>
        <button>
          <ArrowBackOutline />
        </button>
        <Typography>Back to Users List</Typography>
      </div>
      <div className={cl.nameAndPhotoContainer}>
        <Avatar avatarURL={user.profile.avatars?.[0]?.url || exampleImg} className={cl.avatar} />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Typography variant={'h1'}>
            {user.profile.firstName || ' '} {user.profile.lastName || ' '}
          </Typography>
          <Typography className={cl.username} variant={'regular-link'}>
            {user?.userName}
          </Typography>
        </div>
      </div>
      <div className={cl.userInfoContainer}>
        <div className={cl.userInfo}>
          <Typography className={cl.lightText}>UserID</Typography>
          <Typography variant={'medium-text'}>{user.id}</Typography>
        </div>
        <div className={cl.userInfo}>
          <Typography className={cl.lightText}>Profile Creation Date</Typography>
          <Typography variant={'medium-text'}>{formatDate(user.createdAt)}</Typography>
        </div>
      </div>
      <CurrentUserTabs />
      {error && <Alert message={error.message} type={'error'} />}
    </div>
  )
}
