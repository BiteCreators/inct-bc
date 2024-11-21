import { Meta, StoryObj } from '@storybook/react'

import { Loader } from './Loader'

const meta = {
  component: Loader,
} satisfies Meta<typeof Loader>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: args => {
    return <Loader />
  },
}

export const FullScreen: Story = {
  args: { fullScreen: true },
  render: args => {
    return <Loader fullScreen={args.fullScreen} />
  },
}
