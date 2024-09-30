import { TabsBase } from '@/common/components/tabs/Tabs'
import { tabsData } from '@/common/components/tabs/tabsData'
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
    return (
      <div className={'max-w-56'}>
        <TabsBase {...args} />
      </div>
    )
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
