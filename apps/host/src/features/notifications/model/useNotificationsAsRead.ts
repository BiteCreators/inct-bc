import React from 'react'

import { notificationsApi } from '@/entities/notifications'

export const useNotificationsAsRead = ({ readIds }: { readIds: Set<number> }) => {
  const [markAsRead] = notificationsApi.useMarkAsReadMutation()

  const handleInteractOutside = async () => {
    if (readIds.size) {
      await markAsRead({ ids: Array.from(readIds) })
    }
    console.log('Уведомления помечены как прочитанные', readIds)
  }

  return { handleInteractOutside }
}
