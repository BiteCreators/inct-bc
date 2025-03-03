import { MessengerWindow } from '@/features/messenger/ui/MessengerWindow'
import { Typography } from '@byte-creators/ui-kit'

type Props = {}

export const MessengerPage = ({}: Props) => {
  return (
    <div className={'max-w-full h-[80vh] ml-6 mx-16 flex flex-col'}>
      <Typography className={'mb-3 text-2xl'} variant={'h1'}>
        Messenger
      </Typography>
      <div className={'flex'}>
        <div className={'w-[25%] h-full border bg-success-900'}>Chat list</div>
        <MessengerWindow />
      </div>
    </div>
  )
}
