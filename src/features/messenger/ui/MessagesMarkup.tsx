import { mockData, mockImages, step } from '@/features/messenger/mockData'
import { Message } from '@/features/messenger/ui/Message'
import { ScrollArea } from '@byte-creators/ui-kit'

type Props = {}
export const MessagesMarkup = ({}: Props) => {
  return (
    <ScrollArea className={mockImages.length && step === 1 ? 'h-[55vh]' : 'h-[60vh]'}>
      <div className={'px-[70px] pt-10'}>
        {mockData.items.map((item, index) => {
          const isOwner = item.ownerId === 2
          const voiceMessage = item.messageType === 'VOICE'
          const imgMessage = item.messageType === 'IMAGE'
          const imgMessageWithoutText = imgMessage && item.messageText === ''
          const isReceivedMessage = item.status === 'RECEIVED' && isOwner
          const isReadMessage = item.status === 'READ' && isOwner

          return (
            <Message
              imgMessage={imgMessage}
              imgMessageWithoutText={imgMessageWithoutText}
              isOwner={isOwner}
              isReadMessage={isReadMessage}
              isReceivedMessage={isReceivedMessage}
              item={item}
              key={item.id}
              voiceMessage={voiceMessage}
            />
          )
        })}
      </div>
    </ScrollArea>
  )
}
