import { useState } from 'react'

import { Pagination } from '@/common/ui'

type Payment = {
  dateOfPayment: string
  endDateOfSubscription: string
  paymentType: string
  price: number
  subscriptionId: string
  subscriptionType: string
  userId: number
}

function getArray(start: number, end: number, total: number) {
  const payments: Payment[] = Array.from({ length: total }, (_, ind) => ({
    dateOfPayment: '2024-11-04',
    endDateOfSubscription: '2024-11-04',
    paymentType: 'STRIPE',
    price: ind,
    subscriptionId: '',
    subscriptionType: 'MONTHLY',
    userId: 0,
  }))
  const newArray = payments.slice(start, end)

  debugger

  return newArray
}

export const MyPayments = () => {
  const totalCount = 300
  const [currentPage, setCurrentPage] = useState(1)
  const [paymentsPortion, setPaymentsPortion] = useState(10)
  const [payments, setPayments] = useState(getArray(0, Number(paymentsPortion), totalCount))
  //   let payments = getArray(0, Number(paymentsPortion), totalCount)

  const handleCurrentPageChange = (page: number) => {
    setCurrentPage(page)
    setPayments(getArray(paymentsPortion * (page - 1), paymentsPortion * page, totalCount))
    debugger
  }

  const handlePaymentsPortionChange = (portion: string) => {
    setPaymentsPortion(Number(portion))
    setPayments(
      getArray(Number(portion) * (currentPage - 1), Number(portion) * currentPage, totalCount)
    )
    debugger
  }
  const pagesCount = totalCount / Number(paymentsPortion)

  return (
    <div>
      <table className={'w-full h-full table-fixed border-spacing-x-[75px]'}>
        <thead>
          <tr
            className={'bg-dark-500 text-left h-[48px] border-solid border-[1px] border-dark-500'}
          >
            <th className={'pl-6 mr-[70px]'}>Date of Payment</th>
            <th className={'border-solid border-[1px] border-dark-500'}>
              End date of subscription
            </th>
            <th className={'border-solid border-[1px] border-dark-500'}>Price</th>
            <th className={'border-solid border-[1px] border-dark-500'}>Subscription Type</th>
            <th className={'border-solid border-[1px] border-dark-500'}>Payment Type</th>
          </tr>
        </thead>
        <tbody className={''}>
          {payments.map(payment => (
            <tr
              className={'border-solid border-[1px] border-dark-500 h-[48px]'}
              key={payment.subscriptionId}
            >
              <td className={'pl-6'}>{payment.dateOfPayment}</td>
              <td>{payment.endDateOfSubscription}</td>
              <td className={'border-solid border-[1px] border-dark-500'}>{payment.price}</td>
              <td className={'border-solid border-[1px] border-dark-500'}>
                {payment.subscriptionType}
              </td>
              <td className={'border-solid border-[1px] border-dark-500'}>{payment.paymentType}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        className={'mt-9 w-auto'}
        currentPage={currentPage}
        onChangePagesPortion={handlePaymentsPortionChange}
        onClickPaginationButton={handleCurrentPageChange}
        pagesCount={pagesCount}
        pagesPortion={paymentsPortion.toString()}
      />
    </div>
  )
}
