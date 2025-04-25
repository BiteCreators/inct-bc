import React from 'react'

import { paymentsApi } from '@/entities/payments'
import { useSubscriptionManagement } from '@/features/payments/lib/hooks/useSubscriptionManagement'
import { Alert, Button, Card, Checkbox, Modal, Typography } from '@byte-creators/ui-kit'
import { useScopedTranslation } from '@byte-creators/utils'

export const CurrentSubscriptionCard = () => {
  const { data } = paymentsApi.useGetCurrentPaymentQuery()
  const {
    apiError,
    autoRenewalAlert,
    handleCheckboxChange,
    handleModalClose,
    isOpen,
    setAutoRenewalAlert,
  } = useSubscriptionManagement()

  const t = useScopedTranslation('Payments')

  const isCheckboxChecked = data?.hasAutoRenewal

  const endDateOfSubscription = new Date(
    data?.data?.at(-1)?.endDateOfSubscription || ''
  ).toLocaleDateString()

  return (
    <>
      <Typography className={'font-weight-600'} variant={'h3'}>
        {t.currentSubscription}
      </Typography>
      <Card className={'flex mt-2'}>
        <div className={'flex flex-col mx-4 my-3 gap-5'}>
          <Typography className={'text-light-900'}>{t.expireAt}</Typography>
          <Typography className={'font-weight-600'}>{endDateOfSubscription}</Typography>
        </div>
        {isCheckboxChecked && (
          <div className={'flex flex-col ml-12 my-3 gap-5'}>
            <Typography className={'text-light-900'}>{t.nextPayment}</Typography>
            <Typography className={'font-weight-600'}>{endDateOfSubscription}</Typography>
          </div>
        )}
      </Card>
      <Checkbox
        checked={isCheckboxChecked}
        className={'mt-3'}
        onChecked={() => handleCheckboxChange(!!isCheckboxChecked)}
        text={<Typography className={'font-weight-600 mt-3'}>{t.autoRenewal}</Typography>}
      />
      {autoRenewalAlert && (
        <Alert
          message={t.errors.cancelled}
          onClose={() => setAutoRenewalAlert(false)}
          purpose={'alert'}
          type={'success'}
        />
      )}
      <Modal
        className={'min-w-[360px]'}
        handleInteractOutside={handleModalClose}
        isOpen={isOpen}
        mode={'default'}
        onOpenChange={handleModalClose}
        title={'Sorry!'}
      >
        <p className={'mb-16'}>To enable auto-renewal, please make a payment.</p>
        <Button className={'w-full mb-6'} onClick={handleModalClose} variant={'primary'}>
          <span>OK</span>
        </Button>
      </Modal>
      {!!apiError && <Alert message={apiError} purpose={'toast'} type={'error'} />}
    </>
  )
}
