import { Button, Loader, Typography } from '@/common/ui'
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
          {/*TODO: make that with toasts or find a better way*/}
          {!!apiError && <div className={'text-danger-500 mt-3'}>{apiError}</div>}
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
