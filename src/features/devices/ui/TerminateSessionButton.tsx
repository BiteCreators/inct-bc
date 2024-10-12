import { devicesApi } from '@/common/api/devices.api'
import { LogOut } from '@/common/assets/icons/components'

export const TerminateSessionButton = ({ deviceId }: { deviceId: number }) => {
  const [logOut] = devicesApi.useTerminateSessionByIdMutation()

  const handleClick = async () => {
    try {
      logOut({ deviceId }).unwrap()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <button
      className={'flex gap-3 align-middle hover:text-primary-100 delay-75 transition-colors'}
      onClick={handleClick}
    >
      <LogOut /> Log out
    </button>
  )
}
