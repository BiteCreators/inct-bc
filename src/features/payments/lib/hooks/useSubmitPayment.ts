import { useState } from 'react'

import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { useHandleApiError } from '@/common/lib/hooks/useHanldeApiError'
import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import { PAYMENT_PROVIDERS, TYPE_DESCRIPTIONS, paymentsApi } from '@/entities/payments'

import { paymentsSlice } from '../../model/payments.slice'
import { SubscriptionFormData, createSubscriptionSchema } from '../schemas/subscription.schema'

export const useSubmitPayment = ({
  onFailure,
  onSuccess,
  provider,
}: {
  onFailure: () => void
  onSuccess: () => void
  provider: PAYMENT_PROVIDERS
}) => {
  const subscriptionType = useAppSelector(paymentsSlice.selectors.selectNewSubscriptionType)
  const { data: subscriptionTypes } = paymentsApi.useGetCostPaymentQuery()
  const [createPaymentSubscription, { isLoading }] =
    paymentsApi.useCreatePaymentSubscriptionMutation()

  const [validationError, setValidationError] = useState('')
  const [apiError, setApiError] = useState('')
  const { handleApiError } = useHandleApiError('Payments')

  const t = useScopedTranslation('Payments')

  const getPaymentDataByType = (desc: TYPE_DESCRIPTIONS | null) => {
    if (subscriptionTypes) {
      return subscriptionTypes.data.find(type => type.typeDescription === desc)
    }
  }

  const subscribe = async (data: SubscriptionFormData) => {
    try {
      const response = await createPaymentSubscription(data).unwrap()

      if (response.url) {
        window.location.href = response.url
      } else {
        onSuccess()
      }
      console.log(response)
    } catch (error) {
      handleApiError({ error, setApiError })
      onFailure()
    }
  }

  const handleSubmit = async () => {
    const paymentData = getPaymentDataByType(subscriptionType)
    const submitData = {
      amount: paymentData?.amount,
      baseUrl:
        process.env.NEXT_PUBLIC_BASE_URL ||
        'http://localhost:3000/en/profile/1431/settings?tab=account-management',
      paymentType: provider,
      typeSubscription: paymentData?.typeDescription,
    }

    const { data, error, success } = createSubscriptionSchema(t).safeParse(submitData)

    if (success) {
      subscribe(data)
    } else {
      setValidationError(error.toString())
      onFailure()
    }
  }

  return { error: validationError || apiError, handleSubmit, isLoading }
}
