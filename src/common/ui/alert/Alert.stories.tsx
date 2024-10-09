import { useState } from 'react'

import { Button } from '@/common/ui'
import { Meta, StoryObj } from '@storybook/react'

import { Alert } from './Alert'

const meta: Meta<typeof Alert> = {
  component: Alert,
}

export default meta

type Story = StoryObj<typeof Alert>

export const Success: Story = {
  args: {
    message: 'Your settings are saved',
    purpose: 'alert',
    type: 'success',
  },
}

export const Error: Story = {
  args: {
    message: 'Error! Server is not available',
    purpose: 'alert',
    type: 'error',
  },
}

export const Info: Story = {
  args: {
    message: 'Information: Changes have been applied',
    purpose: 'alert',
    type: 'info',
  },
}

export const ShowOnButtonClick: Story = {
  render: () => {
    const [showAlert, setShowAlert] = useState(false)

    return (
      <div>
        <Button onClick={() => setShowAlert(!showAlert)}>Alert</Button>
        {showAlert && (
          <Alert
            message={'This is an alert triggered by a button'}
            onClose={() => setShowAlert(false)}
            purpose={'alert'}
            type={'error'}
          />
        )}
      </div>
    )
  },
}

export const Toast: Story = {
  render: () => {
    const [showAlert, setShowAlert] = useState(false)

    return (
      <div>
        <Button className={'mb-2'} onClick={() => setShowAlert(!showAlert)}>
          Toast
        </Button>
        {showAlert && (
          <Alert
            message={'This is really toast.'}
            onClose={() => setShowAlert(false)}
            purpose={'toast'}
            type={'error'}
          />
        )}
      </div>
    )
  },
}
