import { mockData } from '@/features/messenger/mockData'
import { MessagesMarkup } from '@/features/messenger/ui/MessagesMarkup'
import { SendMessageTextArea } from '@/features/messenger/ui/SendMessageTextArea'
import { Typography, UserProfile } from '@byte-creators/ui-kit'

type Props = {}
export const MessengerWindow = ({}: Props) => {
  return (
    <div
      className={
        'flex flex-col justify-between h-full w-[75%] border-[2px] border-dark-300 overflow-y-hidden'
      }
    >
      <div className={'w-full bg-dark-500 border-b border-dark-300 h-[72px] p-3 pt-4'}>
        {mockData.items.length ? (
          <UserProfile avatarUrl={''} profileId={1431} userName={'fireonexxxxxx'} />
        ) : null}
      </div>
      {mockData.items.length ? (
        <>
          <MessagesMarkup />
          <SendMessageTextArea onChange={() => {}} />
        </>
      ) : (
        <div className={'h-[65vh] flex justify-center items-center'}>
          <div className={'py-3 px-6 rounded-lg bg-dark-300'}>
            <Typography variant={'medium-text'}>Choose who you would like to talk to</Typography>
          </div>
        </div>
      )}
    </div>
  )
}
