import { Notification, notificationsApi } from '@/entities/notifications'
import { useGetRelativeTime } from '@byte-creators/utils'
import { useRouter } from 'next/router'

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

  const { locale } = useRouter()

  const translateValue = {
    debited: 'Следующий платеж за подписку будет списан с вашего счета через 1 день ',
    ends: 'Срок действия вашей подписки истекает через 1 день',
    until: 'Ваша подписка активирована и действует до ',
  }

  const translateNotification = (notification: Notification) => {
    if (notification.message.includes('until')) {
      const date = notification.message.split(' ').at(-1)

      notification.message = translateValue['until'] + date
    }

    if (notification.message.includes('debited')) {
      notification.message = translateValue['debited']
    }

    if (notification.message.includes('ends')) {
      notification.message = translateValue['ends']
    }
  }

  const notificationsCorrectDate = notificationsItems?.map(notification => {
    const copyNotification = { ...notification }

    if (locale !== 'en') {
      translateNotification(copyNotification)
    }

    copyNotification.createdAt = getRelativeTime(new Date(notification.createdAt).getTime())

    return copyNotification
  })

  return {
    markAsRead,
    notReadNotificationsIds,
    notificationsCorrectDate,
  }
}
