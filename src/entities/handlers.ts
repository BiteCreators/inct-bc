import { authHanlders } from './auth'
import { commentsHandlers } from './comments'
import { devicesHandlers } from './devices'
import { notificationsHandlers } from './notifications'
import { paymentsHandlers } from './payments'
import { postsHandlers } from './posts'
import { profileHanlders } from './profile'

export const handlers = [
  ...authHanlders,
  ...commentsHandlers,
  ...devicesHandlers,
  ...notificationsHandlers,
  ...paymentsHandlers,
  ...postsHandlers,
  ...profileHanlders,
]
