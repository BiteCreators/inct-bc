import React from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Notifications } from './Notifications'

const meta: Meta<typeof Notifications> = {
  argTypes: {},
  component: Notifications,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Notifications>

const notificationData = [
  {
    id: 1,
    isRead: true,
    message: 'Your next payment will be debited in 1 day',
    notifyAt: '2024-01-02T12:59:27.088Z',
  },
  {
    id: 2,
    isRead: false,
    message: 'Your next payment will be debited in 2 day',
    notifyAt: '2024-11-20T05:49:07.088Z',
  },
  {
    id: 3,
    isRead: true,
    message: 'Your next payment will be debited in 3 day',
    notifyAt: '2024-04-05T07:22:33.088Z',
  },
  {
    id: 4,
    isRead: false,
    message: 'Your next payment will be debited in 4 day',
    notifyAt: '2024-10-07T01:17:19.088Z',
  },
]

export const Default: Story = {
  args: {
    notificationsItems: notificationData,
  },
  render: args => {
    const [notifications, setNotifications] = React.useState(notificationData)

    const handleClick = (id: number) => {
      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification.id === id ? { ...notification, isRead: false } : notification
        )
      )
    }

    return (
      <Notifications
        {...args}
        notificationsItems={notifications}
        onClickForStorybook={handleClick}
      />
    )
  },
}
