import { Alert, Button, Loader, Typography } from '@packages/shared/ui'
import Image from 'next/image'

import { useEmailConfirmed } from '../model/useEmailConfrmed'
import { LinkExpiredWrapper } from './LinkExpiredWrapper'
import { LinkSentModal } from './LinkSentModal'
import { SignInButton } from './SignInButton'

export const EmailConfirmed = () => {
  const {
    apiError,
    confirmationState,
    handleResendClick,
    isModalOpen,
    isResendLinkLoading,
    setApiError,
    setIsModalOpen,
    t,
  } = useEmailConfirmed()

  switch (confirmationState) {
    case 'pending':
      return <Loader />
    case 'rejected':
      return (
        <>
          <LinkExpiredWrapper
            button={
              <Button disabled={isResendLinkLoading} onClick={handleResendClick}>
                {t.resendVerificationLink}
              </Button>
            }
          />
          {!!apiError && (
            <Alert
              message={apiError}
              onClose={() => setApiError('')}
              purpose={'toast'}
              type={'error'}
            />
          )}
          <LinkSentModal
            bodyText={t.emailVerificationLinkSentAgain}
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            title={t.emailSent}
          />
        </>
      )
    case 'success':
      return (
        <div className={'flex text-center flex-col items-center'}>
          <Typography variant={'h2'}>{t.congratulations}</Typography>
          <Typography className={'mt-[19px]'}>{t.yourEmailConfirmed}</Typography>
          <div className={'mt-[60px] flex w-[330px] sm:w-[183px] flex-col sm:order-1 order-2'}>
            <SignInButton variant={'primary'} />
          </div>
          <Image
            alt={'sing-up-bro'}
            className={'mt-[72px] sm:order-2 order-1'}
            height={300}
            src={'/images/sign-up-bro.png'}
            width={432}
          />
        </div>
      )
  }
}
