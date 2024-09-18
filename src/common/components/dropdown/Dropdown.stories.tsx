import { PaperPlane, Person } from '@/common/assets/icons/components'
import { Meta, StoryObj } from '@storybook/react'

import { Dropdown } from './Dropdown'

const meta = {
  component: Dropdown,
} satisfies Meta<typeof Dropdown>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [{ label: 'Unfollow' }, { label: 'Copy Link' }],
  },
  render: args => <Dropdown {...args} />,
}

export const WithIcons: Story = {
  args: {
    iconButton: <PaperPlane />,
    items: [
      {
        icon: <Person />,
        label: 'Profile Settings',
        onClick: () => alert('Profile Settings clicked'),
      },
      { icon: <PaperPlane />, label: 'Statistics', onClick: () => alert('Statistics clicked') },
      { label: 'Favorites', onClick: () => alert('Favorites clicked') },
      { label: 'Log Out', onClick: () => alert('Log Out clicked') },
    ],
  },
  render: args => <Dropdown {...args} />,
}
