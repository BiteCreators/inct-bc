import React from 'react'

import { useAppDispatch, useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { paymentsApi } from '@/entities/payments'
import { useAccountManagement } from '@/features/payments/model/useAccountManagement'
import { Button, Loader, Modal, Typography } from '@byte-creators/ui-kit'

import { paymentsSlice } from '..'
import { AccountTypeCard } from './AccountTypeCard'
import { CurrentSubscriptionCard } from './CurrentSubscriptionCard'
import { PayPalPaymentButton } from './PayPalPaymentButton'
import { StripePaymentButton } from './StripePaymentButton'
import { SubscriptionTypeCard } from './SubscriptionTypeCard'

export const AccountManagement = () => {
  const { data, isLoading } = paymentsApi.useGetCurrentPaymentQuery()
  const accountType = useAppSelector(paymentsSlice.selectors.selectAccountType)

  const dispatch = useAppDispatch()

  const { handelModalClose, paymentModal } = useAccountManagement()

  let disableAccountTypeOption = false

  const subscriptionTypesText =
    accountType === 'Business' ? 'Change your subscription:' : 'Your subscription costs:'

  if (data?.data.length !== undefined && data?.data.length !== 0) {
    dispatch(paymentsSlice.actions.setAccountType('Business'))
    disableAccountTypeOption = true
  }

  if (isLoading) {
    return (
      <div className={'flex justify-center pt-11'}>
        <Loader />
      </div>
    )
  }

  return (
    <div className={'relative'}>
      {data?.data.length !== 0 && <CurrentSubscriptionCard />}
      <AccountTypeCard disableOption={disableAccountTypeOption} />
      {accountType === 'Business' && (
        <>
          <SubscriptionTypeCard text={subscriptionTypesText} />
          <div className={'flex sm:gap-14 items-center w-full sm:justify-end justify-between'}>
            <PayPalPaymentButton />
            <Typography>or</Typography>
            <StripePaymentButton />
          </div>
        </>
      )}
      <Modal
        className={'min-w-[360px]'}
        handleInteractOutside={handelModalClose}
        isOpen={paymentModal.isOpen}
        mode={'default'}
        onOpenChange={handelModalClose}
        title={paymentModal.status}
      >
        {paymentModal.status === 'Success' ? (
          <p className={'mb-16'}>Payment was successful!</p>
        ) : (
          <p className={'mb-16'}>Transaction failed. Please, write to support</p>
        )}
        <Button className={'w-full mb-6'} onClick={handelModalClose} variant={'primary'}>
          <span>OK</span>
        </Button>
      </Modal>
    </div>
  )
}
