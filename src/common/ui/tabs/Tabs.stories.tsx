import { TabsBase } from '@/common/ui/tabs/Tabs'
import { tabsData } from '@/common/ui/tabs/tabsData'
import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

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
    variant: {
      description: 'Варианты отображения вкладок - Primary | Secondary.',
    },
  },
  component: TabsBase,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TabsBase>

export const Primary: StoryObj<typeof TabsBase> = {
  args: {
    onClick: action('click primary tab'),
    tabsData,
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary вариант вкладок',
      },
    },
  },
}

export const Secondary: StoryObj<typeof TabsBase> = {
  args: {
    onClick: action('click secondary tab'),
    tabsData,
    variant: 'secondary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Secondary вариант вкладок',
      },
    },
  },
}

export default meta