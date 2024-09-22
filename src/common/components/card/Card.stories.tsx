import { Button } from '@/common/components/button/Button'
import { Card } from '@/common/components/card/Card'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Card> = {
  component: Card,
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => <Card {...args} className={'min-w-[100px] min-h-[100px]'} />,
}

export const WithText: Story = {
  args: {
    children: (
      <>
        <h2>Text</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </>
    ),
  },
  render: args => <Card {...args} className={'max-w-[300px]'} />,
}

export const FitContent: Story = {
  args: {
    children: (
      <div className={'flex flex-col items-center'}>
        <h3 className={'text-xl font-semibold text-white'}>Custom Content</h3>
        <Button className={'mt-4'}>Click Me</Button>
      </div>
    ),
  },
  render: args => <Card {...args} className={'max-w-fit'} />,
}
