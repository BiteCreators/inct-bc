import { handlerNotificationsData } from '@/mocks/notifications/handlerNotificationsData'
import { HttpResponse, http } from 'msw'

let secondRequest = false

export const handlersNotifications = [
  http.get('/v1/notifications/*', () => {
    const ids = [22, 44]

    if (!secondRequest) {
      secondRequest = true

      return HttpResponse.json(handlerNotificationsData['get'])
    } else {
      return HttpResponse.json({
        items: handlerNotificationsData['get'].items.map(item =>
          ids.includes(item.id) ? { ...item, isRead: true } : item
        ),
      })
    }
  }),
  http.put('v1/notifications/mark-as-read', async ({ request }) => {
    console.log('put')
  }),
]
