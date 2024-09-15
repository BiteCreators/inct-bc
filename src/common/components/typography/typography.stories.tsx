import Typography from '@/common/components/typography/Typography'
import { Meta } from '@storybook/react'

const meta = {
  component: Typography,
} satisfies Meta<typeof Typography>

export default meta

export const Typographys = {
  render: () => (
    <div className={'flex flex-col'}>
      <Typography variant={'large'}>
        Lorem ipsum dolor sit amet, consectetur adipisicing.
      </Typography>
      <Typography variant={'h1'}>
        111Lorem ipsum dolor sit amet, consectetur adipisicing.
      </Typography>
      <Typography variant={'h3'}>Lorem ipsum dolor sit amet, consectetur adipisicing.</Typography>
      <Typography variant={'h3'}>Lorem ipsum dolor sit amet, consectetur adipisicing.</Typography>

      <Typography variant={'regular-text'}>
        Lorem ipsum dolor sit amet, consectetur adipisicing.
      </Typography>
      <Typography variant={'regular-link'}>
        Lorem ipsum dolor sit amet, consectetur adipisicing.
      </Typography>
      <Typography className={'font-bold'} variant={'small-text'}>
        Lorem ipsum dolor sit amet, consectetur adipisicing.
      </Typography>
    </div>
  ),
}
