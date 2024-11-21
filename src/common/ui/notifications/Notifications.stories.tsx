import type { Meta, StoryObj } from '@storybook/react'

import { Provider } from 'react-redux'

import { store } from '@/app/store'
import { NotificationsButton } from '@/features/notifications/ui/NotificationsButton'
import { handlersNotifications } from '@/mocks/notifications/handlersNotifications'

const meta: Meta<typeof NotificationsButton> = {
  component: NotificationsButton,
  parameters: {
    msw: {
      handlers: handlersNotifications,
    },
  },
}

export default meta

type Story = StoryObj<typeof NotificationsButton>

export const Notifications: Story = {
  render: () => (
    <Provider store={store}>
      <NotificationsButton />
    </Provider>
  ),
}
