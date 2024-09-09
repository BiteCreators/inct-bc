import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Icon } from '../icon/Icon'
import { Select } from './select'

const meta: Meta<typeof Select> = {
  component: Select,
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    children: (
      <>
        <Select.Item value={'test'}>{'test'}</Select.Item>
        <Select.Item value={'test1'}>{'test1'}</Select.Item>
      </>
    ),
    id: 'default',
    label: 'select',
    placeholder: 'select',
  },
}
export const Required: Story = {
  args: {
    children: (
      <>
        <Select.Item value={'test'}>{'test'}</Select.Item>
        <Select.Item value={'test1'}>{'test1'}</Select.Item>
      </>
    ),
    id: 'required',
    label: 'required',
    placeholder: 'required',
    required: true,
  },
}

export const Disabled: Story = {
  args: {
    children: (
      <>
        <Select.Item value={'test'}>{'test'}</Select.Item>
        <Select.Item value={'test1'}>{'test1'}</Select.Item>
      </>
    ),
    disabled: true,
    id: 'disabled',
    label: 'disabled',
    placeholder: 'disabled',
  },
}

export const WithIcon: Story = {
  args: {
    id: 'with-icon',
    label: 'with icon',
    placeholder: 'select',
  },
  render: () => {
    const [lang, setLang] = useState<'en' | 'ru'>('ru')

    return (
      <Select
        icon={
          lang === 'ru' ? (
            <Icon
              height={'20px'}
              iconId={'russian-flag'}
              viewBox={'-3 -1.5 40 30'}
              width={'30px'}
            />
          ) : (
            <Icon
              className={'fill-current text-light-100'}
              height={'20px'}
              iconId={'home'}
              viewBox={'-3 -1.5 30 30'}
              width={'20px'}
            />
          )
        }
        onValueChange={(value: 'en' | 'ru') => setLang(value)}
        value={lang}
      >
        <Select.Item value={'ru'}>{'Russian'}</Select.Item>
        <Select.Item value={'en'}>{'English'}</Select.Item>
      </Select>
    )
  },
}
