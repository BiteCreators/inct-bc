import { TabsBase } from '@/common/components/tabs/Tabs'
import { Meta } from '@storybook/react'

const meta = {
  component: TabsBase,
} satisfies Meta<typeof TabsBase>

export const Primary = {
  args: {
    children: 'Primary',
    onClick: () => console.log('click primary tab'),
    variant: 'primary',
  },
}

export const Secondary = {
  args: {
    children: 'Secondary',
    onClick: () => console.log('click secondary tab'),
    variant: 'secondary',
  },
}

export default meta
