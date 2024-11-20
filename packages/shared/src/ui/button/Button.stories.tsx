import { Meta } from '@storybook/react'
import Link from 'next/link'

import { Button } from './Button'

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
    title: 'Primary button',
    variant: 'secondary',
  },
}
export const Outline = {
  args: {
    children: 'Button',
    onClick: () => alert('click'),
    title: 'Primary button',
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
