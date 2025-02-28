import { MessagesMarkup } from '@/features/messenger/ui/MessagesMarkup'
import { SendMessageTextArea } from '@/features/messenger/ui/SendMessageTextArea'
import { UserProfile } from '@byte-creators/ui-kit'

type Props = {}
export const MessengerWindow = ({}: Props) => {
  return (
    <div className={'flex flex-col justify-between h-full w-[75%] border-[2px] border-dark-300'}>
      <div className={'w-full bg-dark-500 border-b border-dark-300 h-[72px] p-3 pt-4'}>
        <UserProfile avatarUrl={''} profileId={1431} userName={'fireonexxxxxx'} />
      </div>
      <MessagesMarkup />
      <SendMessageTextArea />
    </div>
  )
}
