import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import { Alert, Typography } from '@/common/ui'
import { devicesApi } from '@/entities/devices'
import { ErrorQueryType } from '@/entities/devices/api/devices.api'

import { SessionCard } from './SessionCard'
import { TerminateSessionButton } from './TerminateSessionButton'

export const SessionsList = () => {
  const { data, error, isError, isLoading, isSuccess } = devicesApi.useGetSessionsQuery()
  const t = useScopedTranslation('Devices')

  if (isSuccess) {
    const { current, others } = data

    return (
      <div>
        <Typography className={'mb-[6px]'} variant={'h2'}>
          {t.activeSessions}
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
