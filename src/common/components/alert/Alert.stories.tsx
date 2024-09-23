import { useState } from 'react'

import { Button } from '@/common/components/button/Button'
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
    onClose: () => alert('Closed success alert'),
    type: 'success',
  },
}

export const Error: Story = {
  args: {
    message: 'Error! Server is not available',
    onClose: () => alert('Closed error alert'),
    type: 'error',
  },
}

export const Info: Story = {
  args: {
    message: 'Information: Changes have been applied',
    onClose: () => alert('Closed info alert'),
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
            type={'error'}
          />
        )}
      </div>
    )
  },
}
