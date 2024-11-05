import { Notification } from '@/entities/notifications'
import TimeAgo, { DateInput } from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'
import { useRouter } from 'next/router'

export const useNotifications = (notificationsItems: Notification[]) => {
  const router = useRouter()

  const getRelativeTime = (date: DateInput) => {
    TimeAgo.addDefaultLocale(en)
    TimeAgo.addLocale(ru)

    const locale = router.locale === 'en' ? 'en-US' : 'ru-RU'

    const timeAgo = new TimeAgo(locale)

    return timeAgo.format(date)
  }

  const notificationsCount = notificationsItems.filter(notification => !notification.isRead).length

  const notificationsCorrectDate = notificationsItems.map(notification => {
    return { ...notification, notifyAt: getRelativeTime(new Date(notification.notifyAt).getTime()) }
  })

  return {
    notificationsCorrectDate,
    notificationsCount,
  }
}
