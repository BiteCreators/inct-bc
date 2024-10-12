import React from 'react'

import { Card, Typography } from '@/common/ui'

import { useSessionCard } from '../model/useSessionCard'

type Props = {
  action?: React.ReactNode
  browserName: string
  ip: string
  lastVisit?: string
  type: 'browser' | 'device'
}

export const SessionCard = ({ action, browserName, ip, lastVisit, type }: Props) => {
  const { icon, lastVisitDate, title } = useSessionCard({ browserName, lastVisit, type })

  return (
    <Card className={'flex p-6 pt-[18px] justify-between'}>
      <div className={'flex gap-3'}>
        <div className={'mt-[6px]'}>{icon}</div>
        <div>
          <Typography variant={'h2'}>{title}</Typography>
          <Typography className={'mt-3'}>IP: {ip}</Typography>
          {!!lastVisit && <Typography className={'mt-3'}>Last visit: {lastVisitDate}</Typography>}
        </div>
      </div>
      {!!action && <div className={'self-center'}>{action}</div>}
    </Card>
  )
}
