import { Modal } from '@/common/components/modal/Modal'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Modal,
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => {
    return (
      <div>
        <Modal {...args} />
      </div>
    )
  },
}
