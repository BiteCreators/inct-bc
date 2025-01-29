import { useState } from 'react'

import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { useHandleApiError } from '@/common/lib/hooks/useHanldeApiError'
import { PAYMENT_PROVIDERS, TYPE_DESCRIPTIONS, paymentsApi } from '@/entities/payments'
import { paymentsSlice } from '@/features/payments'
import { useScopedTranslation } from '@byte-creators/utils'
import { useRouter } from 'next/router'

import { SubscriptionFormData, createSubscriptionSchema } from '../schemas/subscription.schema'

export const useSubmitPayment = ({ provider }: { provider: PAYMENT_PROVIDERS }) => {
  const subscriptionType = useAppSelector(paymentsSlice.selectors.selectNewSubscriptionType)
  const { data: subscriptionTypes } = paymentsApi.useGetCostPaymentQuery()
  const [createPaymentSubscription, { isLoading }] =
    paymentsApi.useCreatePaymentSubscriptionMutation()

  const { query } = useRouter()

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
        setValidationError('url failed')
      }
    } catch (error) {
      handleApiError({ error, setApiError })
    }
  }

  const handleSubmit = async () => {
    const paymentData = getPaymentDataByType(subscriptionType)
    const submitData = {
      amount: paymentData?.amount,
      baseUrl:
        process.env.NEXT_PUBLIC_BASE_URL +
        `/en/profile/${query.id}/settings?tab=account-management`,
      paymentType: provider,
      typeSubscription: paymentData?.typeDescription,
    }

    const { data, error, success } = createSubscriptionSchema(t).safeParse(submitData)

    if (success) {
      subscribe(data)
    } else {
      setValidationError(error.toString())
    }
  }

  return { error: validationError || apiError, handleSubmit, isLoading }
}
