import { Button } from '@/common/components/button/Button'
import { Meta } from '@storybook/react'

const meta = {
  component: Button,
} satisfies Meta<typeof Button>

export const Primary = {
  args: {
    children: 'Button',
    onClick: () => console.log('click'),
    title: 'Primary button',
    variant: 'primary',
  },
}
export const Secondary = {
  args: {
    children: 'Button',
    onClick: () => console.log('click'),
    title: 'Primary button',
    variant: 'secondary',
  },
}
export const Outline = {
  args: {
    children: 'Button',
    onClick: () => console.log('click'),
    title: 'Primary button',
    variant: 'outline',
  },
}
export const Text = {
  args: {
    children: 'Button',
    onClick: () => console.log('click'),
    title: 'Primary button',
    variant: 'text',
  },
}
export default meta
