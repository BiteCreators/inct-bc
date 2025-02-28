import { mockData } from '@/features/messenger/mockData'
import { UserAvatar } from '@/widgets/profile-header/ui/UserAvatar'
import { ScrollArea, Typography } from '@byte-creators/ui-kit'
import { CheckmarkOutline, DoneAllOutline } from '@byte-creators/ui-kit/icons'
import { cn } from '@byte-creators/utils'

type Props = {}
export const MessagesMarkup = ({}: Props) => {
  return (
    <ScrollArea className={'max-h-[65vh]'}>
      <div className={'px-[70px] pt-10'}>
        {mockData.items.map((item, index) => {
          const isOwner = item.ownerId === 2
          const voiceMessage = item.messageType === 'VOICE'
          const imgMessage = item.messageType === 'IMAGE'
          const imgMessageWithoutText = imgMessage && item.messageText === ''
          const isReceivedMessage = item.status === 'RECEIVED' && isOwner
          const isReadMessage = item.status === 'READ' && isOwner

          return (
            <div className={cn(['flex my-6 relative'], isOwner && 'justify-end')} key={item.id}>
              <UserAvatar
                className={cn([
                  'w-9 absolute bottom-[18px] transform translate-y-1/2',
                  isOwner ? '-right-12' : '-left-12',
                ])}
                isLoading={false}
                src={''}
              />
              <div
                className={cn(
                  ['max-w-80 h-fit rounded-lg  flex flex-col'],
                  isOwner ? 'bg-primary-900' : 'bg-dark-300',
                  imgMessageWithoutText && 'bg-transparent'
                )}
              >
                {imgMessage && (
                  <img
                    alt={'Image message'}
                    className={'object-contain rounded-sm'}
                    src={item.url}
                  />
                )}
                {!imgMessageWithoutText ? (
                  <Typography className={'px-3 mt-2'} variant={'regular-text'}>
                    {voiceMessage ? 'Voice message' : item.messageText}
                  </Typography>
                ) : null}

                <Typography
                  className={cn([
                    'flex pb-2 text-light-900 self-end mt-1',
                    !imgMessageWithoutText && 'pr-3',
                  ])}
                  variant={'small-text'}
                >
                  {new Date(item.createdAt).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    hour12: false,
                    minute: '2-digit',
                  })}
                  {isReceivedMessage && (
                    <CheckmarkOutline height={16} viewBox={'0 0 20 25'} width={16} />
                  )}
                  {isReadMessage && <DoneAllOutline height={16} viewBox={'0 0 20 25'} width={16} />}
                </Typography>
              </div>
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
}
