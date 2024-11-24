import { Meta, StoryObj } from '@storybook/react'

import { ScrollArea } from './ScrollArea'

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`)

const meta = {
  component: ScrollArea,
} satisfies Meta<typeof ScrollArea>

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
    children: 'Mērī qībōñoso kēli, āeksio vestras Qībōñoso iā daor, kēli pogrī ēza',
    className: 'h-20 w-96 whitespace-nowrap',
    orientation: 'horizontal',
  },
}

export default meta
