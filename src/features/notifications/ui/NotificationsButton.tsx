import { FillBell } from '@/common/assets/icons/components'
import { Dropdown } from '@/common/ui'
import { notificationData } from '@/common/ui/notification/notificationsData'
import { useNotifications } from '@/features/notifications/model/useNotifications'

import { NotificationsList } from './Notifications'

export const NotificationsButton = () => {
  const { notificationsCorrectDate, notificationsCount } = useNotifications(notificationData)

  return (
    <div className={'relative w-6 h-5'}>
      <Dropdown
        className={
          'p-0 -right-[9px] top-1 [&>button]:p-0 [&>button]:text-light-100 [&>button]:hover:text-light-100'
        }
        iconButton={
          <div
            className={
              'text-[8px] before:text-light-100 before:content-[attr(data-notificationsCount)] before:absolute before:right-0 before:block before:w-3 before:h-3 before:bg-danger-500 before:rounded-full'
            }
            data-notificationsCount={notificationsCount}
          >
            <FillBell />
          </div>
        }
        iconColorOpen={'text-primary-500'}
      >
        <NotificationsList notificationsItems={notificationsCorrectDate} />
      </Dropdown>
    </div>
  )
}
