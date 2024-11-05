import { useState } from 'react'

import { FillBell } from '@/common/assets/icons/components'
import { cn } from '@/common/lib/utils/cn'
import { notificationData } from '@/common/ui/notification/notificationsData'
import { useNotifications } from '@/features/notifications/model/useNotifications'

import { NotificationsList } from './Notifications'

export const NotificationsButton = () => {
  const [viewNotifications, setViewNotifications] = useState(false)

  const { notificationsCorrectDate, notificationsCount } = useNotifications(notificationData)

  return (
    <div className={'relative h-6'}>
      <button
        className={
          'text-[8px] before:content-[attr(data-notificationsCount)] before:absolute before:right-0 before:block before:w-3 before:h-3 before:bg-danger-500 before:rounded-full'
        }
        data-notificationsCount={notificationsCount}
        onClick={() => setViewNotifications(!viewNotifications)}
      >
        <FillBell className={cn(viewNotifications ? 'text-primary-500' : 'text-light-100')} />
      </button>
      <div className={'absolute -right-[9px] mt-2'}>
        {viewNotifications && <NotificationsList notificationsItems={notificationsCorrectDate} />}
      </div>
    </div>
  )
}
