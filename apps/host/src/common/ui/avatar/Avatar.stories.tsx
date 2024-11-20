import { Avatar } from '@/common/ui/avatar/Avatar'
import { Meta, StoryObj } from '@storybook/react'

import exampleImage from '../../../../public/examples/exampleAvatar.png'

const meta: Meta<typeof Avatar> = {
  component: Avatar,
}

export default meta

type Story = StoryObj<typeof Avatar>

export const Small: Story = {
  args: {
    avatarURL: exampleImage.src,
    href: '',
  },
}

export const Big: Story = {
  args: {
    avatarURL: exampleImage.src,
    href: '',
  },
}
