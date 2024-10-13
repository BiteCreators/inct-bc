import { useState } from 'react'

import { devicesApi } from '@/common/api/devices.api'
import { useHandleApiError } from '@/common/lib/hooks/useHanldeApiError'
import { Alert, Button, Loader, Typography } from '@/common/ui'

import { SessionCard } from './SessionCard'

export const CurrentDevice = () => {
  const { data, error, isError, isLoading, isSuccess } = devicesApi.useGetSessionsQuery()
  const [terminateAllSessions, { isLoading: isTerminateLoading }] =
    devicesApi.useTerminateAllSessionsMutation()
  const [terminateError, setTerminateError] = useState('')
  const { handleApiError } = useHandleApiError('Devices')

  if (isLoading) {
    return (
      <div className={'flex justify-center pt-11'}>
        <Loader />
      </div>
    )
  }

  const handleClick = async () => {
    try {
      terminateAllSessions().unwrap()
    } catch (error) {
      handleApiError({ error, setApiError: setTerminateError })
    }
  }

  if (isError) {
    //TODO: handle error
    return <div>{JSON.stringify(error)}</div>
  }

  if (isSuccess) {
    const { current } = data

    return (
      <div className={'flex flex-col'}>
        <Typography className={'mb-[6px]'} variant={'h1'}>
          Current device
        </Typography>
        <SessionCard browserName={current.browserName} ip={current.ip} type={'browser'} />
        <Button
          className={'mt-6 self-end'}
          disabled={isTerminateLoading}
          onClick={handleClick}
          variant={'outline'}
        >
          Terminate all other sessions
        </Button>
        {!!terminateError && (
          <Alert message={terminateError} onClose={() => setTerminateError('')} type={'error'} />
        )}
      </div>
    )
  }
}
