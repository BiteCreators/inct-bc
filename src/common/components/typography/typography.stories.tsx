import Typography from '@/common/components/typography/Typography'
import { Meta } from '@storybook/react'

const meta = {
  component: Typography,
} satisfies Meta<typeof Typography>

export default meta

export const Typographys = {
  render: () => (
    <div className={'flex flex-col'}>
      <Typography variant={'h2'}>Heading 1</Typography>
      <Typography variant={'h3'}>Heading 2</Typography>
      <Typography variant={'h3'}>Heading 2</Typography>
      <Typography variant={'bold_text_14'}>Heading 2</Typography>
      <Typography variant={'large'}>Heading 2</Typography>
      <Typography variant={'regular_text_16'}>Heading 2</Typography>
      <Typography variant={'small_link'}>Heading 2</Typography>
      <Typography variant={'semi_bold_small_text'}>Heading 2</Typography>
      <Typography variant={'small_text'}>Heading 2</Typography>
    </div>
  ),
}
