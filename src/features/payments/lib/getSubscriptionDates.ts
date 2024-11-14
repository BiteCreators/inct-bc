import { Subscription } from '@/entities/payments'

export const getSubscriptionDates = (data: Subscription[]) => {
  const mlsecondsCount = data.reduce((res, subscription) => {
    const today = new Date()
    const endDateOfSubscription = new Date(subscription.endDateOfSubscription)
    const diffMls = Math.abs(
      Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) -
        Date.UTC(
          endDateOfSubscription.getFullYear(),
          endDateOfSubscription.getMonth(),
          endDateOfSubscription.getDate()
        )
    )

    return diffMls + res
  }, 0)
  const expireAt = new Date(Date.now() + mlsecondsCount).toLocaleDateString()
  const nextPayment = new Date(
    Date.now() + mlsecondsCount + 24 * 60 * 60 * 1000
  ).toLocaleDateString()

  return {
    expireAt,
    nextPayment,
  }
}
