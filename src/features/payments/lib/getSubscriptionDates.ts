import { Subscription } from '@/entities/payments'

export const getSubscriptionDates = (data: Subscription[]) => {
  const paymentsDatesArray = data.map(el => {
    return new Date(el.dateOfPayment).getTime()
  })
  const min = Math.min(...paymentsDatesArray)

  const subscriptionsMlsecondsCount = data.reduce((res, subscription) => {
    const subscribeMlsecCount =
      new Date(subscription.endDateOfSubscription).getTime() -
      new Date(subscription.dateOfPayment).getTime()

    return res + subscribeMlsecCount
  }, 0)
  const expireAt = new Date(min + subscriptionsMlsecondsCount).toLocaleDateString()
  const nextPayment = new Date(
    min + subscriptionsMlsecondsCount + 24 * 60 * 60 * 1000
  ).toLocaleDateString()

  return {
    expireAt,
    nextPayment,
  }
}
