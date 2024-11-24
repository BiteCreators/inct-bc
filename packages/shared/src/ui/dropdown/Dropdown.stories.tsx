import { Meta, StoryObj } from '@storybook/react'

import { PaperPlane, Person } from '../../assets/icons/components'
import { Dropdown } from './Dropdown'

const meta = {
  component: Dropdown,
} satisfies Meta<typeof Dropdown>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { label: 'Unfollow', onClick: () => alert('Unfollow clicked') },
      { label: 'Copy Link', onClick: () => alert('Copy Link clicked') },
    ],
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
      {
        icon: <PaperPlane />,
        label: 'Statistics',
        onClick: () => alert('Statistics clicked'),
      },
      { label: 'Favorites', onClick: () => alert('Favorites clicked') },
      { label: 'Log Out', onClick: () => alert('Log Out clicked') },
    ],
  },
  render: args => <Dropdown {...args} />,
}

export const UsingChildren: Story = {
  render: args => (
    <Dropdown {...args}>
      <div className={'p-2'}>
        <div
          className={'flex items-center cursor-pointer p-2 global-hover:hover:bg-dark-100 rounded'}
        >
          <Person className={'mr-2'} />
          <span>Custom Profile Settings</span>
        </div>
        <div
          className={'flex items-center cursor-pointer p-2 global-hover:hover:bg-dark-100 rounded'}
        >
          <PaperPlane className={'mr-2'} />
          <span>Custom Send Message</span>
        </div>
      </div>
    </Dropdown>
  ),
}
