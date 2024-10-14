import { devicesApi } from '@/common/api/devices.api'
import { Typography } from '@/common/ui'

import { SessionCard } from './SessionCard'
import { TerminateSessionButton } from './TerminateSessionButton'

export const SessionsList = () => {
  const { data, error, isError, isLoading, isSuccess } = devicesApi.useGetSessionsQuery()

  if (isError) {
    //TODO: handle error
    return <div>error</div>
  }

  if (isSuccess) {
    const { current, others } = data

    return (
      <div>
        <Typography className={'mb-[6px]'} variant={'h2'}>
          Active sessions
        </Typography>

        {others.map(session => {
          if (session.deviceId === current.deviceId) {
            return null
          }

          return (
            <SessionCard
              action={<TerminateSessionButton deviceId={session.deviceId} />}
              browserName={session.browserName}
              ip={session.ip}
              key={session.deviceId}
              lastVisit={session.lastActive}
              osName={session.osName}
              type={'device'}
            />
          )
        })}
      </div>
    )
  }
}
