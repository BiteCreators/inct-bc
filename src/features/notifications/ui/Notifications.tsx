import React, { useEffect, useRef } from 'react'

import { Notification } from '@/entities/notifications'
import { useNotifications } from '@/features/notifications/model/useNotifications'
import { ScrollArea } from '@byte-creators/ui-kit'
import { cn } from '@byte-creators/utils'

type Props = {
  notificationsItems: Notification[] | undefined
}

export const NotificationsList = ({ notificationsItems }: Props) => {
  const { markAsRead, notReadNotificationsIds, notificationsCorrectDate } = useNotifications({
    notificationsItems,
  })

  const isMounted = useRef(false)

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true

      return
    }

    return () => {
      if (notReadNotificationsIds && notReadNotificationsIds.length > 0) {
        markAsRead({ ids: notReadNotificationsIds })
      }
    }
  }, [])

  return (
    <div
      className={
        'min-w-[280px] sm:min-w-[355px] px-2 py-4 border-dark-100 border-solid border rounded bg-dark-500 relative'
      }
    >
      <h3
        className={
          'text-md font-weight500 mb-3 px-3 before:block before:w-2 before:h-2 before:bg-dark-500 before:absolute before:-top-[4.75px] before:right-4 before:border-t before:border-l before:border-dark-100 before:rotate-45'
        }
      >
        Уведомления
      </h3>
      <ScrollArea
        className={cn(
          notificationsCorrectDate && notificationsCorrectDate?.length > 3
            ? 'h-[290px]'
            : 'max-h-[290px]'
        )}
      >
        {notificationsCorrectDate && notificationsCorrectDate?.length > 0 ? (
          notificationsCorrectDate.map(notification => (
            <div
              className={'py-3 border-t border-dark-100 mx-3'}
              data-id={notification.id}
              key={notification.id}
            >
              <p className={'text-sm font-weight700'}>
                {!notification.isRead && <span className={'text-primary-700'}>Новое </span>}
                Уведомление.
              </p>
              <p className={'text-sm cursor-pointer'}>{notification.message}</p>
              <span className={'text-xs text-light-900'}>{notification.createdAt}</span>
            </div>
          ))
        ) : (
          <p>No notifications</p>
        )}
      </ScrollArea>
    </div>
  )
}
