import { useEffect, useState } from 'react'

import { authApi } from '@/common/api/auth.api'
import Typography from '@/common/components/typography/Typography'
import { useScopedTranslation } from '@/common/utils/hooks/useTranslation'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

import { SignInButton } from './SignInButton'

export const EmailConfirmed = () => {
  const t = useScopedTranslation('Auth')
  const params = useSearchParams()
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [confirmRegistration, { isLoading }] = authApi.useRegistrationConfirmationMutation()

  useEffect(() => {
    const sendConfirmationCode = async () => {
      try {
        await confirmRegistration({ confirmationCode: params?.get('code') ?? '' }).unwrap()
        setIsConfirmed(true)
      } catch (error) {
        setIsConfirmed(false)
      }
    }

    sendConfirmationCode()
  }, [confirmRegistration, params])

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
