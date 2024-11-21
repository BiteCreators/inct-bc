import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { FlagRussia, FlagUnitedKingdom } from '../../assets/icons/components'
import { Select, SelectItem } from './Select'

const meta: Meta<typeof Select> = {
  component: Select,
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    children: (
      <>
        <SelectItem value={'test'}>option 1</SelectItem>
        <SelectItem value={'test1'}>option 2</SelectItem>
        <SelectItem value={'test2'}>option 3 with longer text option 3 with longer text</SelectItem>

        <SelectItem value={'test3'}>option 4</SelectItem>
        <SelectItem value={'test4'}>option 5</SelectItem>
        <SelectItem value={'test5'}>option 6</SelectItem>
        <SelectItem value={'test6'}>option 7</SelectItem>
        <SelectItem value={'test7'}>option 8</SelectItem>
        <SelectItem value={'test8'}>option 9</SelectItem>
        <SelectItem value={'test9'}>option 10</SelectItem>
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
        <SelectItem value={'test'}>option 1</SelectItem>
        <SelectItem value={'test1'}>option 2</SelectItem>
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
        <SelectItem value={'test'}>option 1</SelectItem>
        <SelectItem value={'test1'}>option 2</SelectItem>
        <SelectItem value={'test2'}>option 3 with longer text option 3 with longer text</SelectItem>
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
        <SelectItem value={'test'}>option 1</SelectItem>
        <SelectItem value={'test1'}>option 2</SelectItem>
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
        <SelectItem value={'test'}>option 1</SelectItem>
        <SelectItem value={'test1'}>option 2</SelectItem>
      </>
    ),
    error: 'error message',
    id: 'error',
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
        icon={lang === 'ru' ? <FlagRussia /> : <FlagUnitedKingdom />}
        onValueChange={(value: 'en' | 'ru') => setLang(value)}
        value={lang}
      >
        <SelectItem value={'ru'}>{'Russian'}</SelectItem>
        <SelectItem value={'en'}>{'English'}</SelectItem>
      </Select>
    )
  },
}
