import { Meta, StoryObj } from '@storybook/react'

import { ScrollAria } from './ScrollArea'

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`)

const meta = {
  component: ScrollAria,
} satisfies Meta<typeof ScrollAria>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div>
        <h4>Tags</h4>
        <div>{tags}</div>
      </div>
    ),
    className: 'h-96 w-80',
  },
}
export const Horizontal: Story = {
  args: {
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    className: 'h-20 w-96 whitespace-nowrap',
    orientation: 'horizontal',
  },
}

export default meta
