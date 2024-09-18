import { Button } from '@/common/components/button/Button'
import { Meta } from '@storybook/react'
import Link from 'next/link'

const meta = {
  component: Button,
} satisfies Meta<typeof Button>

export const Primary = {
  args: {
    children: 'Button',
    onClick: () => alert('click'),
    title: 'Primary button',
    variant: 'primary',
  },
}
export const Secondary = {
  args: {
    children: 'Button',
    onClick: () => alert('click'),
    title: 'Secondary button',
    variant: 'secondary',
  },
}
export const Outline = {
  args: {
    children: 'Button',
    onClick: () => alert('click'),
    title: 'Outline button',
    variant: 'outline',
  },
}
export const Text = {
  args: {
    children: 'Button',
    onClick: () => alert('click'),
    title: 'Text button',
    variant: 'text',
  },
}
export const LinkButton = {
  render: () => {
    return (
      <Button asChild>
        <Link href={'#'}>LinkButton</Link>
      </Button>
    )
  },
}

export const Disabled = {
  args: {
    children: 'Button',
    disabled: true,
    onClick: () => alert('click'),
    title: 'Disabled button',
    variant: 'primary',
  },
}
export default meta
