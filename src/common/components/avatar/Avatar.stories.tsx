import { Avatar } from '@/common/components/avatar/Avatar'
import Typography from '@/common/components/typography/Typography'
import { Meta, StoryObj } from '@storybook/react'

import exampleImage from './../../../../public/examples/exampleAvatar.png'

const meta: Meta<typeof Avatar> = {
  component: Avatar,
}

export default meta

type Story = StoryObj<typeof Avatar>

export const Small: Story = {
  args: {
    avatarURL: exampleImage.src,
    href: '',
    size: 40,
  },
}

export const Big: Story = {
  args: {
    avatarURL: exampleImage.src,
    href: '',
    size: 300,
  },
}
