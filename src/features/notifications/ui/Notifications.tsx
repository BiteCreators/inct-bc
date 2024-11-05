import React from 'react'

import { ScrollArea } from '@/common/ui'

export type NotificationsData = {
  notificationsItems: NotificationItem[]
  onClickForStorybook?: (id: number) => void // for storybook
}

export type NotificationItem = {
  id: number
  isRead: boolean
  message: string
  notifyAt: string
}

export const Notifications = ({ notificationsItems, onClickForStorybook }: NotificationsData) => {
  const handlerNotification = (id: number) => {
    if (onClickForStorybook) {
      onClickForStorybook(id)
    }
    console.log('notificationId', id)
  }

  return (
    <div
      className={
        'min-w-[280px] sm:min-w-[355px] px-2 py-4 border-dark-100 border-solid border rounded bg-dark-500 relative'
      }
    >
      <h3
        className={
          'text-md font-weight500 mb-3 px-3 before:block before:w-2 before:h-2 before:bg-dark-900 before:absolute before:-top-[4.75px] before:right-4 before:border-t before:border-l before:border-dark-100 before:rotate-45 '
        }
      >
        Уведомления
      </h3>
      <ScrollArea className={'h-[355px]'}>
        {notificationsItems.map(notification => (
          <div className={'py-3 border-t border-dark-100 mx-3'} key={notification.id}>
            <p className={'text-sm font-weight700'}>
              Новое уведомление!
              {!notification.isRead && <span className={'text-primary-700'}> Новое</span>}
            </p>
            <p
              className={'text-sm cursor-pointer'}
              onClick={() => handlerNotification(notification.id)}
            >
              {notification.message}
            </p>
            <span className={'text-xs text-light-900'}>{notification.notifyAt}</span>
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}
