import { useState } from 'react'

import { useHandleApiError } from '@/common/lib/hooks/useHanldeApiError'
import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import { Alert, Button, Loader, Typography } from '@/common/ui'
import { devicesApi } from '@/entities/devices'
import { ErrorQueryType } from '@/entities/devices/api/devices.api'

import { SessionCard } from './SessionCard'

export const CurrentDevice = () => {
  const { data, error, isError, isLoading, isSuccess } = devicesApi.useGetSessionsQuery()
  const [terminateAllSessions, { isLoading: isTerminateLoading }] =
    devicesApi.useTerminateAllSessionsMutation()
  const [terminateError, setTerminateError] = useState('')
  const { handleApiError } = useHandleApiError('Devices')
  const t = useScopedTranslation('Devices')

  if (isLoading) {
    return <div className={'flex justify-center pt-11'}>{/*<Loader />*/}</div>
  }

  const handleClick = async () => {
    try {
      terminateAllSessions().unwrap()
    } catch (error) {
      // handleApiError({ error, setApiError: setTerminateError })
    }
  }

  if (isError) {
    const err = error as ErrorQueryType
    //
    // return (
    //   <Alert
    //     duration={999999}
    //     message={err.data.messages[0].message}
    //     purpose={'alert'}
    //     type={'error'}
    //   />
    // )
  }

  if (isSuccess) {
    const { current } = data

    return (
      <div className={'flex flex-col'}>
        {/*<Typography className={'mb-[6px]'} variant={'h1'}>*/}
        {/*  {t.currentDevice}*/}
        {/*</Typography>*/}
        {/*<SessionCard browserName={current.browserName} ip={current.ip} type={'browser'} />*/}
        {/*<Button*/}
        {/*  className={'mt-6 self-end'}*/}
        {/*  disabled={isTerminateLoading}*/}
        {/*  onClick={handleClick}*/}
        {/*  variant={'outline'}*/}
        {/*>*/}
        {/*  {t.terminateOtherSessions}*/}
        {/*</Button>*/}
        {/*{!!terminateError && (*/}
        {/*  <Alert*/}
        {/*    message={terminateError}*/}
        {/*    onClose={() => setTerminateError('')}*/}
        {/*    purpose={'toast'}*/}
        {/*    type={'error'}*/}
        {/*  />*/}
        {/*)}*/}
      </div>
    )
  }
}
