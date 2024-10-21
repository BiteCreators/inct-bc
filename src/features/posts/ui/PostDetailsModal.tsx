import { Avatar, Dropdown, Modal, Typography } from '@/common/ui'

import exampleAvatar from '../../../../public/examples/exampleAvatar.png'

type Props = {}

type CommentsType = []

const comments = [] as CommentsType[]

export const PostDetailsModal = ({}: Props) => {
  return (
    <Modal
      className={'w-full'}
      isOpen
      mode={'outside'}
      title={
        <div className={'flex justify-between w-full'}>
          <div className={'flex max-h-9 py-0 gap-3 items-center'}>
            <div className={'flex items-center pt-2'}>
              <Avatar
                avatarURL={exampleAvatar.src}
                imgStyles={'w-9 h-9 rounded-full object-cover'}
              />
            </div>
            <Typography className={''} variant={'h3'}>
              URLProfile
            </Typography>
          </div>
          <Dropdown className={'-top-0.5'} items={[]} />
        </div>
      }
    >
      {comments.map((comment, i) => (
        <></>
      ))}
    </Modal>
  )
}
