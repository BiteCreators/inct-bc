import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Button } from '../button/Button'
import { Alert } from './Alert'

const meta: Meta<typeof Alert> = {
  component: Alert,
}

export default meta

type Story = StoryObj<typeof Alert>

export const Success: Story = {
  args: {
    canClose: true,
    message: 'Your settings are saved',
    purpose: 'alert',
    type: 'success',
  },
}

export const Error: Story = {
  args: {
    canClose: true,
    message: 'Error! Server is not available',
    purpose: 'alert',
    type: 'error',
  },
}

export const Info: Story = {
  args: {
    canClose: true,
    message: 'Information: Changes have been applied',
    purpose: 'alert',
    type: 'info',
  },
}

export const NotAutoClosing: Story = {
  args: {
    canClose: false,
    message: 'Close me',
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
            canClose={false}
            message={'This is an alert triggered by a button'}
            purpose={'alert'}
            type={'error'}
          />
        )}
      </div>
    )
  },
}

export const Toasts: Story = {
  render: () => {
    const [showAlert, setShowAlert] = useState(false)

    return (
      <div>
        <Button className={'mb-2'} onClick={() => setShowAlert(!showAlert)}>
          Toast
        </Button>
        {showAlert && (
          <>
            <Alert message={'This is really toast.'} purpose={'toast'} type={'error'} />
            <Alert
              canClose={false}
              message={'This is really closed toast.'}
              purpose={'toast'}
              type={'error'}
            />
          </>
        )}
      </div>
    )
  },
}
