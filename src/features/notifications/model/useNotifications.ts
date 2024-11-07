import { useGetRelativeTime } from '@/common/lib/hooks/useGetRelativeTime'
import { Notification } from '@/entities/notifications'

export const useNotifications = (notificationsItems: Notification[]) => {
  const { getRelativeTime } = useGetRelativeTime()

  const notificationsCount = notificationsItems.filter(notification => !notification.isRead).length

  const notificationsCorrectDate = notificationsItems.map(notification => {
    return { ...notification, notifyAt: getRelativeTime(new Date(notification.notifyAt).getTime()) }
  })

  return {
    notificationsCorrectDate,
    notificationsCount,
  }
}
