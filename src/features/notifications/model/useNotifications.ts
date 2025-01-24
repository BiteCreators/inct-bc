import { Notification, notificationsApi } from '@/entities/notifications'
import { useGetRelativeTime } from '@byte-creators/utils'

export const useNotifications = ({
  notificationsItems,
}: {
  notificationsItems: Notification[] | undefined
}) => {
  const { getRelativeTime } = useGetRelativeTime()
  const [markAsRead] = notificationsApi.useMarkAsReadMutation()
  const notReadNotificationsIds = notificationsItems
    ?.filter(notifications => !notifications.isRead)
    .map(notification => notification.id)

  const notificationsCorrectDate = notificationsItems?.map(notification => {
    return {
      ...notification,
      createdAt: getRelativeTime(new Date(notification.createdAt).getTime()),
    }
  })

  return {
    markAsRead,
    notReadNotificationsIds,
    notificationsCorrectDate,
  }
}
