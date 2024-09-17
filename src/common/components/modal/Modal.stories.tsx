import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Modal } from './Modal'

const meta = {
  component: Modal,
  title: 'Components/Modal',
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <p>This is the default content of the modal.</p>,
    isOpen: true,
    onOpenChange: (open: boolean) => console.log('Modal open state:', open),
    title: 'Default Modal',
  },
  render: args => {
    return (
      <div>
        <Modal {...args} />
      </div>
    )
  },
}

export const Closed: Story = {
  args: {
    children: <p>This modal is closed by default.</p>,
    isOpen: false,
    onOpenChange: (open: boolean) => console.log('Modal open state:', open),
    title: 'Closed Modal',
  },
  render: args => {
    const [isOpen, setIsOpen] = useState(args.isOpen)

    return (
      <div>
        <button
          className={'px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'}
          onClick={() => setIsOpen(true)}
        >
          Open Modal
        </button>
        <Modal {...args} isOpen={isOpen} onOpenChange={setIsOpen} />
      </div>
    )
  },
}

export const CustomContent: Story = {
  args: {
    children: (
      <div>
        <h2 className={'text-xl font-bold'}>Custom Content</h2>
        <p>This modal contains custom content, such as headers and additional text.</p>
        <button className={'mt-4 px-4 py-2 bg-blue-600 text-white rounded'}>Action Button</button>
      </div>
    ),
    isOpen: true,
    onOpenChange: (open: boolean) => console.log('Modal open state:', open),
    title: 'Modal with Custom Content',
  },
  render: args => {
    return (
      <div>
        <Modal {...args} />
      </div>
    )
  },
}
