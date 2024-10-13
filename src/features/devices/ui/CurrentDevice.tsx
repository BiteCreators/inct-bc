import { devicesApi } from '@/common/api/devices.api'
import { useHandleApiError } from '@/common/lib/hooks/useHanldeApiError'
import { Button, Loader, Typography } from '@/common/ui'

import { SessionCard } from './SessionCard'

export const CurrentDevice = () => {
  const { data, error, isError, isLoading, isSuccess } = devicesApi.useGetSessionsQuery()
  const [terminateAllSessions] = devicesApi.useTerminateAllSessionsMutation()

  if (isLoading) {
    return <Loader />
  }

  const handleClick = async () => {
    try {
      terminateAllSessions().unwrap()
    } catch (error) {
      //TODO: handle error
      console.log(error)
    }
  }

  // if (isError) {
  //   handleApiError(error)
  // }

  if (isSuccess) {
    const { current } = data

    return (
      <div className={'flex flex-col'}>
        <Typography className={'mb-[6px]'} variant={'h1'}>
          Current device
        </Typography>
        <SessionCard browserName={current.browserName} ip={current.ip} type={'browser'} />
        <Button className={'mt-6 self-end'} onClick={handleClick} variant={'outline'}>
          Terminate all other sessions
        </Button>
      </div>
    )
  }
}
