import React from 'react'

import { notificationData } from '@/common/ui/notification/notificationsData'
import { Meta, StoryObj } from '@storybook/react'

import { Notifications } from './Notifications'

const meta: Meta<typeof Notifications> = {
  argTypes: {
    notificationsItems: {
      description: 'Принимает обязательный массив объектов уведомлений',
    },
    onClickForStorybook: {
      description: 'Обработчик для установки статуса isRead в true',
    },
  },
  component: Notifications,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Notifications>

export const Default: Story = {
  args: {
    notificationsItems: notificationData,
  },
  render: args => {
    const [notifications, setNotifications] = React.useState(notificationData)

    const handleClick = (id: number) => {
      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification.id === id ? { ...notification, isRead: true } : notification
        )
      )
    }

    return <Notifications notificationsItems={notifications} onClickForStorybook={handleClick} />
  },
}
