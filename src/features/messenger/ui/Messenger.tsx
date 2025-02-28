import { MessengerWindow } from '@/features/messenger/ui/MessengerWindow'

type Props = {}

export const MessengerPage = ({}: Props) => {
  return (
    <div className={'max-w-full h-full max-h-[80vh] ml-6 mx-16 my-12 flex'}>
      <div className={'w-[25%] h-full border bg-success-900'}>Chat list</div>
      <MessengerWindow />
    </div>
  )
}
