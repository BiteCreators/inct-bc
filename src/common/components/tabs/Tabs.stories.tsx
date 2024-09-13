import { TabsBase } from '@/common/components/tabs/Tabs'
import { tabsData } from '@/common/components/tabs/tabsData'
import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {
    children: {
      description: 'Имя вкладки',
    },
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
    children: 'Primary',
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
    children: 'Secondary',
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
