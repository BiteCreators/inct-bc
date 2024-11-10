import { FillBell } from '@/common/assets/icons/components'
import OutlineBellNoNumber from '@/common/assets/icons/components/OutlineBellNoNumber'
import { cn } from '@/common/lib/utils/cn'
import { Dropdown } from '@/common/ui'
import { useNotifications } from '@/features/notifications/model/useNotifications'

import { NotificationsList } from './Notifications'
import { notificationData } from './notificationsData'

export const NotificationsButton = () => {
  const { notificationsCorrectDate, notificationsCount } = useNotifications(notificationData)
  const wrapIconStyles =
    'text-[8px] before:text-light-100 before:content-[attr(data-notificationsCount)] before:absolute before:right-0 before:block before:w-3 before:h-3 before:bg-danger-500 before:rounded-full'

  return (
    <div className={'relative h-6'}>
      <Dropdown
        className={
          'p-0 -right-[9px] top-1 [&>button]:p-0 [&>button]:text-light-100 [&>button]:hover:text-light-100'
        }
        iconButton={
          <div className={cn(wrapIconStyles)} data-notificationsCount={notificationsCount}>
            <OutlineBellNoNumber viewBox={'-3 2 24 24'} />
          </div>
        }
        iconButtonOpen={
          <div className={cn(wrapIconStyles)} data-notificationsCount={notificationsCount}>
            <FillBell className={'text-primary-500'} />
          </div>
        }
      >
        <NotificationsList notificationsItems={notificationsCorrectDate} />
      </Dropdown>
    </div>
  )
}
