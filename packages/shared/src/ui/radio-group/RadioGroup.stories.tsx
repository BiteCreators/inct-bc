import type { Meta, StoryObj } from '@storybook/react'

import { action } from '@storybook/addon-actions'

import { RadioGroup } from './RadioGroup'

const meta: Meta<typeof RadioGroup> = {
  argTypes: {
    disabled: {
      description: 'Варианты отображения Radio - Заблокирована | Не заблокирована.',
    },
    error: {
      description: 'Текст сообщения об ошибке.',
    },
    options: {
      description: 'Обязательный массив содержащий объекты со свойствами label и value',
    },
  },
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof RadioGroup>

const radioOptions = [
  { label: 'RadioBtn 1', value: '1' },
  { label: 'RadioBtn 2', value: '2' },
]

export const Default: Story = {
  args: {
    onChange: value => action('value')(value),
    options: radioOptions,
  },
}

export const Disabled: Story = {
  args: { ...Default.args, disabled: true },
}

export const Error: Story = {
  args: { ...Default.args, error: 'Error' },
}
