import { Button, Input, Modal, ScrollArea } from '@/common/ui'
import { FollowersResponse, followersApi } from '@/entities/followers'
import { Follower } from '@/entities/followers/types/followers.types'
import { UserProfile } from '@/entities/profile'

import example from '../../../../public/examples/exampleAvatar.png'

type Props = {
  followersList: FollowersResponse
}
export const ProfileFollowersModal = ({ followersList }: Props) => {
  const [follow, { error: followError, isLoading: followLoading }] =
    followersApi.useFollowMutation()

  const [remove, { error: removeError, isLoading: removeLoading }] =
    followersApi.useRemoveFollowerMutation()

  const handleFollow = async (userId: number) => {
    try {
      await follow({ selectedUserId: userId }).unwrap()
      alert('Successfully followed the user!')
    } catch (err) {
      //add useHandleApiError
      alert('An error occurred while trying to follow the user.')
    }
  }

  const handleDeleteFollower = async (userId: number) => {
    try {
      await remove({ userId }).unwrap()
      alert('Successfully deleted follower!')
    } catch (err) {
      //add useHandleApiError
      alert('An error occurred while trying to delete the follower.')
    }
  }

  return (
    <Modal isOpen maxWidth={'max-w-[644px]'} mode={'default'} title={'2218 Followers'}>
      <div>
        <Input
          className={'w-full max-w-[596px] mt-4 mb-6'}
          inputType={'search'}
          placeholder={'Search'}
        />
        <ScrollArea className={'h-[550px]'}>
          <div className={'mr-2 mt-2'}>
            {followersList.items.map((user: Follower) => (
              <div className={'mb-6 flex justify-around'} key={user.userId}>
                <UserProfile
                  avatarUrl={user.avatars[0]?.url || example.src}
                  className={'w-72'}
                  profileId={user.userId}
                  userName={user.userName}
                />
                <div className={'flex gap-14'}>
                  {!user.isFollowing && (
                    <Button disabled={followLoading} onClick={() => handleFollow(user.userId)}>
                      Follow
                    </Button>
                  )}
                  <Button
                    className={'text-white'}
                    onClick={() => handleDeleteFollower(user.userId)}
                    variant={'text'}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Modal>
  )
}
