import React from 'react'

import { Button } from '@/common/components/button/Button'
import { Icon } from '@/common/components/icon/Icon'
import { Modal } from '@/common/components/modal/Modal'
import Typography from '@/common/components/typography/Typography'
import { cn } from '@/common/utils/cn'
import { StoryObj } from '@storybook/react'

const meta = {
  component: Modal,
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div className={'flex flex-col items-start justify-center'}>
        <span className={'flex items-center'}>
          <button className={cn(['focus:outline-none cursor-pointer flex items-center'])}>
            <Icon
              className={'fill-current text-light-100'}
              iconId={'settings'}
              viewBox={'0 -8 30 40'}
              width={'30'}
            />
            <Typography className={'text-light-100 whitespace-nowrap ml-2'} variant={'medium-text'}>
              settings
            </Typography>
          </button>
        </span>
        <span className={'flex items-center'}>
          <button className={cn(['focus:outline-none cursor-pointer flex items-center'])}>
            <Icon
              className={'fill-current text-light-100'}
              iconId={'settings'}
              viewBox={'0 -8 30 40'}
              width={'30'}
            />
            <Typography className={'text-light-100 whitespace-nowrap ml-2'} variant={'medium-text'}>
              settings
            </Typography>
          </button>
        </span>
        <span className={'flex items-center'}>
          <button className={cn(['focus:outline-none cursor-pointer flex items-center'])}>
            <Icon
              className={'fill-current text-light-100'}
              iconId={'settings'}
              viewBox={'0 -8 30 40'}
              width={'30'}
            />
            <Typography className={'text-light-100 whitespace-nowrap ml-2'} variant={'medium-text'}>
              settings
            </Typography>
          </button>
        </span>
      </div>
    ),
  },
}

export const WithCustomIcon: Story = {
  args: {
    children: (
      <div className={'flex flex-col items-center justify-center'}>
        <Typography className={'text-light-100'} variant={'medium-text'}>
          This is a custom icon modal.
        </Typography>
        <Button className={'mt-3'} onClick={() => alert('Action!')}>
          Action
        </Button>
      </div>
    ),
    triggerIcon: 'settings',
  },
}
