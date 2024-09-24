import { Button } from '@/common/components/button/Button'
import { Loader } from '@/common/components/loader/Loader'
import Typography from '@/common/components/typography/Typography'
import Image from 'next/image'

import { useEmailConfirmed } from '../model/useEmailConfrmed'
import { LinkExpiredWrapper } from './LinkExpiredWrapper'
import { SignInButton } from './SignInButton'

export const EmailConfirmed = () => {
  const { confirmationState, t } = useEmailConfirmed()

  switch (confirmationState) {
    case 'pending':
      return <Loader />
    case 'rejected':
      //TODO: replace with link expired component or a page redirect
      return <LinkExpiredWrapper button={<Button>Test</Button>} />
    case 'success':
      return (
        <div className={'flex text-center flex-col items-center'}>
          <Typography variant={'h2'}>{t.congratulations}</Typography>
          <Typography className={'mt-[19px]'}>{t.yourEmailConfirmed}</Typography>
          <div className={'mt-[60px] flex w-[183px] flex-col'}>
            <SignInButton variant={'primary'} />
          </div>
          <Image
            alt={'sing-up-bro'}
            className={'mt-[72px]'}
            height={300}
            src={'/images/sign-up-bro.png'}
            width={432}
          />
        </div>
      )
  }
}
