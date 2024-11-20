import { useEffect, useRef, useState } from 'react'

import { Notification, notificationsApi } from '@/entities/notifications'
import { useGetRelativeTime } from '@packages/shared/hooks/useGetRelativeTime'

export const useNotifications = ({
  notificationsItems,
}: {
  notificationsItems: Notification[] | undefined
}) => {
  const { getRelativeTime } = useGetRelativeTime()
  const [markAsRead] = notificationsApi.useMarkAsReadMutation()

  const [readIds, setReadIds] = useState<number[]>([])
  const notificationRefs = useRef<(HTMLDivElement | null)[]>([])

  const notificationsCorrectDate = notificationsItems?.map(notification => {
    return { ...notification, notifyAt: getRelativeTime(new Date(notification.notifyAt).getTime()) }
  })

  useEffect(() => {
    const handleMarkAsRead = async (id: number) => {
      await markAsRead({ ids: [id] }).unwrap()
      console.log('Прочитано:', id)
    }
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const notificationId = Number(entry.target.getAttribute('data-id'))

            if (!readIds.includes(notificationId)) {
              setReadIds(prevIds => [...prevIds, notificationId])
              handleMarkAsRead(notificationId)
            }
          }
        })
      },
      {
        threshold: 1.0,
      }
    )

    const currentRefs = notificationRefs.current

    currentRefs.forEach(ref => {
      if (ref) {
        observer.observe(ref)
      }
    })

    return () => {
      currentRefs.forEach(ref => {
        if (ref) {
          observer.unobserve(ref)
        }
      })
    }
  }, [notificationsItems, readIds, markAsRead])

  return {
    notificationRefs,
    notificationsCorrectDate,
  }
}
