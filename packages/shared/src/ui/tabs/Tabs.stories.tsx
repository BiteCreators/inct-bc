import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

import { TabsBase } from './Tabs'
import { tabsData } from './tabsData'

const meta = {
  argTypes: {
    disabled: {
      description: 'Варианты отображения вкладок - Заблокирована | Незаблокирована.',
    },
    onClick: {
      description: 'Функция, вызываемая при клике на вкладку.',
    },
    tabsData: {
      control: { disable: true },
      description: 'Обязательный Props принимающий массив с данными.',
    },
  },
  component: TabsBase,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TabsBase>

export default meta

export const Default: StoryObj<typeof TabsBase> = {
  args: {
    onClick: action('click tab'),
    tabsData,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default вариант вкладок',
      },
    },
  },
  render: args => {
    return <TabsBase {...args} />
  },
}

export const Disabled: StoryObj<typeof TabsBase> = {
  args: {
    disabled: true,
    tabsData,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled вариант вкладок',
      },
    },
  },
}
