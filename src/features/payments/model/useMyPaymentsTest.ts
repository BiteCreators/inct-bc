import { useState } from 'react'

export const useMyPaymentsTest = (paymentsTotalCount: number) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [paymentsPortion, setPaymentsPortion] = useState(10)

  const [payments, setPayments] = useState(getArray(0, Number(paymentsPortion), paymentsTotalCount))

  const handleCurrentPageChange = (page: number) => {
    setCurrentPage(page)
    setPayments(getArray(paymentsPortion * (page - 1), paymentsPortion * page, paymentsTotalCount))
  }

  const handlePaymentsPortionChange = (portion: string) => {
    const lastPage = paymentsTotalCount / Number(portion)

    if (currentPage > lastPage) {
      setCurrentPage(lastPage)
      setPayments(
        getArray(Number(portion) * (lastPage - 1), Number(portion) * lastPage, paymentsTotalCount)
      )
    } else {
      setPayments(
        getArray(
          Number(portion) * (currentPage - 1),
          Number(portion) * currentPage,
          paymentsTotalCount
        )
      )
    }
    setPaymentsPortion(Number(portion))
  }
  let pagesCount = 0
  let isShowPagination = false

  if (paymentsTotalCount) {
    pagesCount = Math.ceil(paymentsTotalCount / Number(paymentsPortion))
    isShowPagination = pagesCount > 1
  }

  return {
    currentPage,
    handleCurrentPageChange,
    handlePaymentsPortionChange,
    isShowPagination,
    pagesCount,
    payments,
    paymentsPortion,
  }
}

type Payment = {
  dateOfPayment: string
  endDateOfSubscription: string
  paymentType: PaymentType
  price: number
  subscriptionId: string
  subscriptionType: SubscriptionType
  userId: number
}
enum PaymentType {
  CREDIT_CARD = 'Credit card',
  PAYPAL = 'PayPal',
  STRIPE = 'Stripe',
}
enum SubscriptionType {
  DAY = '1 day',
  MONTHLY = '1 month',
  WEEKLY = '7 days',
}
function getArray(start: number, end: number, total: number) {
  const payments: Payment[] = Array.from({ length: total }, (_, ind) => ({
    dateOfPayment: '2024-11-05T18:42:55.367Z',
    endDateOfSubscription: '2024-11-05T18:42:55.367Z',
    paymentType: `${ind % 2 === 0 ? PaymentType.PAYPAL : PaymentType.STRIPE}` as PaymentType,
    price: ind,
    subscriptionId: '',
    subscriptionType:
      `${ind % 2 === 0 ? SubscriptionType.DAY : SubscriptionType.MONTHLY}` as SubscriptionType,
    userId: 0,
  }))

  return payments.slice(start, end)
}
