import { Meta } from '@storybook/react'

import { Typography } from './Typography'

const meta = {
  component: Typography,
} satisfies Meta<typeof Typography>

export default meta

export const Typographys = {
  render: () => (
    <div className={'flex flex-col'}>
      <Typography variant={'large'}>Yn hegnīr daorus ilza se lenton spryjataks.</Typography>
      <Typography variant={'h1'}>Yn hegnīr daorus ilza se lenton spryjataks.</Typography>
      <Typography variant={'h2'}>Yn hegnīr daorus ilza se lenton spryjataks.</Typography>
      <Typography variant={'h3'}>Yn hegnīr daorus ilza se lenton spryjataks.</Typography>

      <Typography variant={'regular-text'}>Yn hegnīr daorus ilza se lenton spryjataks.</Typography>
      <Typography variant={'small-text'}>Yn hegnīr daorus ilza se lenton spryjataks.</Typography>
      <Typography variant={'regular-link'}>Yn hegnīr daorus ilza se lenton spryjataks.</Typography>

      <Typography className={'font-bold'} variant={'small-text'}>
        Yn hegnīr daorus ilza se lenton spryjataks.
      </Typography>
    </div>
  ),
}
