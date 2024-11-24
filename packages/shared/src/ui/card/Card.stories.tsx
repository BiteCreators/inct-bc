import { Meta, StoryObj } from '@storybook/react'

import { Button } from '../button/Button'
import { Card } from './Card'
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
          Se skoro syt obūljagon yne sytilības? Mērī qībōñoso kēli, āeksio vestras Qībōñoso iā daor,
          kēli pogrī ēza Se ñuhon sȳz, āeksios, sȳrpa hen aōt Kastāmiro Āeksio sesīr ȳdratas Yn Yn
          hegnīr daorus ilza se lenton spryjataks Kastāmiro Āeksio sesīr ȳdratas Yn sīr āeksio
          lenton daomiossi spryjataks Kastāmiro Āeksio sesīr ȳdratas Yn hegnīr daorus ilza se lenton
          spryjataks Yn sīr āeksio lenton daomiossi spryjataks
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
