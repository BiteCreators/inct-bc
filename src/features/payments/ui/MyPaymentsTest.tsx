import { useState } from 'react'

import { Pagination, Typography } from '@/common/ui'

export const MyPaymentsTest = () => {
  const paymentsTotalCount = 300 //для тестр-ия
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

  return (
    <div className={'relative'}>
      <table className={'w-full h-full table-auto text-sm text-light-100'}>
        <thead>
          <tr className={'bg-dark-500 text-left font-semibold h-[48px]'}>
            <th className={'pl-6 pr-16'}>Date of Payment</th>
            <th className={'pr-16'}>End date of subscription</th>
            <th className={'pr-16'}>Price</th>
            <th className={'pr-16'}>Subscription Type</th>
            <th className={'pr-16'}>Payment Type</th>
          </tr>
        </thead>
        <tbody className={''}>
          {payments?.map(payment => (
            <tr
              className={'border-dark-500 border-b h-[48px] font-normal'}
              key={payment.subscriptionId}
            >
              <td className={'pl-6 pr-16 border-dark-500 border-l'}>
                {new Date(payment.endDateOfSubscription).toLocaleDateString()}
              </td>
              <td className={'pr-16'}>
                {new Date(payment.endDateOfSubscription).toLocaleDateString()}
              </td>
              <td className={'pr-16'}>{`$${payment.price}`}</td>
              <td className={'pr-16'}>{payment.subscriptionType}</td>
              <td className={'pr-16 border-dark-500 border-r'}>{payment.paymentType}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isShowPagination && (
        <Pagination
          className={'mt-9 w-auto'}
          currentPage={currentPage}
          onChangePagesPortion={handlePaymentsPortionChange}
          onClickPaginationButton={handleCurrentPageChange}
          pagesCount={pagesCount}
          pagesPortion={paymentsPortion.toString()}
        />
      )}
    </div>
  )
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
enum SubscriptionType {
  DAY = '1 day',
  MONTHLY = '1 month',
  WEEKLY = '7 days',
}
enum PaymentType {
  CREDIT_CARD = 'Credit card',
  PAYPAL = 'PayPal',
  STRIPE = 'Stripe',
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
