import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

import { Button } from '@/common/components/button/Button'
import { Recaptcha } from '@/common/components/reCaptcha/Recaptcha'
import { Meta } from '@storybook/react'

const meta = {
  component: Recaptcha,
} satisfies Meta<typeof Recaptcha>

export const RecCaptcha = {
  render: () => {
    const { executeRecaptcha } = useGoogleReCaptcha()

    console.log(executeRecaptcha)

    return (
      <form
        className={'bg-dark-100 w-60 h-[200px] flex rounded-2 justify-around flex-col items-center'}
      >
        <Recaptcha />
        <Button onClick={() => {}}>SUBMIT</Button>
      </form>
    )
  },
}
export default meta
