import { devicesApi } from '@/common/api/devices.api'
import { useHandleApiError } from '@/common/lib/hooks/useHanldeApiError'
import { Loader, Typography } from '@/common/ui'

import { SessionCard } from './SessionCard'

export const CurrentDevice = () => {
  const { data, error, isError, isLoading, isSuccess } = devicesApi.useGetSessionsQuery()
  // const { handleApiError } = useHandleApiError('Common')

  if (isLoading) {
    return <Loader />
  }

  // if (isError) {
  //   handleApiError(error)
  // }

  if (isSuccess) {
    const { current } = data

    return (
      <div>
        <Typography className={'mb-[6px]'} variant={'h1'}>
          Current device
        </Typography>
        <SessionCard browserName={current.browserName} ip={current.ip} type={'browser'} />
      </div>
    )
  }
}
