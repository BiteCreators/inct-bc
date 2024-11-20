import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Button } from '../button/Button'
import { Modal } from './Modal'

const meta = {
  component: Modal,
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <p>This is the default content of the modal.</p>,
    isOpen: true,
    mode: 'default',
    title: 'Default Modal',
  },
  render: args => {
    return (
      <div>
        <Modal {...args} />
      </div>
    )
  },
}

export const Closed: Story = {
  args: {
    children: <p>This modal is closed by default.</p>,
    isOpen: false,
    mode: 'default',
    onOpenChange: (open: boolean) => alert('Modal open state:' + open),
    title: 'Closed Modal',
  },
  render: args => {
    const [isOpen, setIsOpen] = useState(args.isOpen)

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal {...args} isOpen={isOpen} onOpenChange={setIsOpen} />
      </div>
    )
  },
}

export const OutsideMode: Story = {
  args: {
    children: (
      <div>
        <h2 className={'text-xl font-bold'}>Custom Content</h2>
        <p>
          Drakari pykiros Tīkummo jemiros Yn lantyz bartossa Saelot vāedis Hen ñuhā elēnī: Perzyssy
          vestretis Se gēlȳn irūdaks Ānogrose Perzyro udrȳssi Ezīmptos laehossi Hārossa letagon Aōt
          vāedan Hae mērot gierūli: Se hāros bartossi Prūmȳsa sōvīli Gevī dāerī
        </p>
        <Button className={'mt-4'}>Button</Button>
      </div>
    ),
    isOpen: true,
    mode: 'outside',
    title: 'Modal with OutsideMode',
  },
  render: args => {
    return (
      <div>
        <Modal {...args} />
      </div>
    )
  },
}

export const CustomMode: Story = {
  args: {
    children: (
      <div>
        <h2 className={'text-xl font-bold'}>Modal with CustomMode</h2>
        <p>
          Drakari pykiros Tīkummo jemiros Yn lantyz bartossa Saelot vāedis Hen ñuhā elēnī: Perzyssy
          vestretis Se gēlȳn irūdaks Ānogrose Perzyro udrȳssi Ezīmptos laehossi Hārossa letagon Aōt
          vāedan Hae mērot gierūli: Se hāros bartossi Prūmȳsa sōvīli Gevī dāerī
        </p>
        <Button className={'mt-4'}>Button</Button>
      </div>
    ),
    isOpen: true,
    mode: 'custom',
    title: 'Modal with CustomMode',
  },
  render: args => {
    return (
      <div>
        <Modal {...args} />
      </div>
    )
  },
}
