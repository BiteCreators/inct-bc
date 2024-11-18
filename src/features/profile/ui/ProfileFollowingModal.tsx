import { Button, Input, Modal, ScrollArea } from '@/common/ui'
import { FollowersResponse } from '@/entities/followers'
import { Follower } from '@/entities/followers/types/followers.types'
import { UserProfile } from '@/entities/profile'

import example from '../../../../public/examples/exampleAvatar.png'

type Props = {
  followingList: FollowersResponse
}
export const ProfileFollowingModal = ({ followingList }: Props) => {
  const handleUnfollow = () => {
    alert(
      'You will never be able to unfollow a user. Humble yourself. Or contact technical support'
    )
  }

  return (
    <Modal isOpen maxWidth={'w-[640px]'} mode={'default'} title={'2218 Following'}>
      <div>
        <Input
          className={'w-full max-w-[596px] mt-4 mb-6'}
          inputType={'search'}
          placeholder={'Search'}
        />
        <ScrollArea className={'h-[550px]'}>
          <div className={'mr-2 mt-2'}>
            {followingList.items.map((user: Follower) => (
              <div className={'mb-6 flex justify-between'} key={user.userId}>
                <UserProfile
                  avatarUrl={user.avatars[0]?.url || example.src}
                  className={'w-72'}
                  profileId={user.userId}
                  userName={user.userName}
                />
                {/*isFollowedBy это подписан ли юзер на текущего пользователя*/}
                {/*isFollowing это подписан ли текущий пользователь на юзера*/}
                {/*Following это те на которых я подписан*/}
                {/*Followers это мои подписчики*/}
                <Button onClick={handleUnfollow} variant={'outline'}>
                  Unfollow
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Modal>
  )
}
