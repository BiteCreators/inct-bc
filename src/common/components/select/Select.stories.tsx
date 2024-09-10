import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Icon } from '../icon/Icon'
import { Select } from './Select'

const meta: Meta<typeof Select> = {
  component: Select,
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    children: (
      <>
        <Select.Item value={'test'}>option 1</Select.Item>
        <Select.Item value={'test1'}>option 2</Select.Item>
        <Select.Item value={'test2'}>
          option 3 with longer text option 3 with longer text
        </Select.Item>

        <Select.Item value={'test3'}>option 4</Select.Item>
        <Select.Item value={'test4'}>option 5</Select.Item>
        <Select.Item value={'test5'}>option 6</Select.Item>
        <Select.Item value={'test6'}>option 7</Select.Item>
        <Select.Item value={'test7'}>option 8</Select.Item>
        <Select.Item value={'test8'}>option 9</Select.Item>
        <Select.Item value={'test9'}>option 10</Select.Item>
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
        <Select.Item value={'test'}>option 1</Select.Item>
        <Select.Item value={'test1'}>option 2</Select.Item>
      </>
    ),
    id: 'required',
    label: 'required',
    placeholder: 'required',
    required: true,
  },
}
export const CustomWidth: Story = {
  args: {
    children: (
      <>
        <Select.Item value={'test'}>option 1</Select.Item>
        <Select.Item value={'test1'}>option 2</Select.Item>
        <Select.Item value={'test2'}>
          option 3 with longer text option 3 with longer text
        </Select.Item>
      </>
    ),
    id: 'custom-w',
    label: 'custom width',
    maxWidth: '500px',
    placeholder: 'custom width',
  },
}
export const Disabled: Story = {
  args: {
    children: (
      <>
        <Select.Item value={'test'}>option 1</Select.Item>
        <Select.Item value={'test1'}>option 2</Select.Item>
      </>
    ),
    disabled: true,
    id: 'disabled',
    label: 'disabled',
    placeholder: 'disabled',
  },
}
export const Error: Story = {
  args: {
    children: (
      <>
        <Select.Item value={'test'}>option 1</Select.Item>
        <Select.Item value={'test1'}>option 2</Select.Item>
      </>
    ),
    error: 'error message',
    id: 'error',
    isError: true,
    label: 'error',
    placeholder: 'error',
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
              height={'20px'}
              iconId={'british-flag'}
              viewBox={'-3 -1.5 40 30'}
              width={'30px'}
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
