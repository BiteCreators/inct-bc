import { useState } from 'react'

import { OutlineBell } from '@/common/assets/icons/components'
import { Notifications } from '@/common/ui/notification/Notifications'
import { notificationData } from '@/common/ui/notification/notificationsData'

export const NotificationsButton = () => {
  const [viewNotifications, setViewNotifications] = useState(false)

  return (
    <>
      <button className={'mr-[5px]'} onClick={() => setViewNotifications(!viewNotifications)}>
        <OutlineBell />
      </button>
      {viewNotifications && <Notifications notificationsItems={notificationData} />}
    </>
  )
}
