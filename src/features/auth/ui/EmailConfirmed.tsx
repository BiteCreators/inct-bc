import Typography from '@/common/components/typography/Typography'
import Image from 'next/image'

import { useEmailConfirmed } from '../model/useEmailConfrmed'
import { SignInButton } from './SignInButton'

export const EmailConfirmed = () => {
  const { isConfirmed, isLoading, t } = useEmailConfirmed()

  if (isLoading) {
    //TODO: replace with a loader component
    return <div>Loading...</div>
  }

  if (!isConfirmed) {
    //TODO: replace with link expired component or a page redirect
    return <div>link expired</div>
  }

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
