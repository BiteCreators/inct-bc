import { useState } from 'react'

import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import { PAYMENT_PROVIDERS, TYPE_DESCRIPTIONS, paymentsApi } from '@/entities/payments'

import { paymentsSlice } from '../../model/payments.slice'
import { createSubscriptionSchema } from '../schemas/subscription.schema'

export const useSubmitPayment = ({ provider }: { provider: PAYMENT_PROVIDERS }) => {
  const subscriptionType = useAppSelector(paymentsSlice.selectors.selectNewSubscriptionType)
  const { data: subscriptionTypes } = paymentsApi.useGetCostPaymentQuery()
  const [validationError, setValidationError] = useState('')
  const t = useScopedTranslation('Payments')

  const getPaymentDataByType = (desc: TYPE_DESCRIPTIONS | null) => {
    if (subscriptionTypes) {
      return subscriptionTypes.data.find(type => type.typeDescription === desc)
    }
  }

  const handleSubmit = () => {
    const paymentData = getPaymentDataByType(subscriptionType)
    const submitData = {
      amount: paymentData?.amount,
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
      paymentType: provider,
      typeSubscription: paymentData?.typeDescription,
    }
    const { data, error, success } = createSubscriptionSchema(t).safeParse(submitData)

    if (success) {
      //TODO: add api call (logic for both payment ways should go here. Need to refactor payment buttons after merge)
      console.log(data)
    } else {
      setValidationError(error.toString())
    }
  }

  return { handleSubmit, validationError }
}
