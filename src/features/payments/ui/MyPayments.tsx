import { useState } from 'react'

import { Pagination, Typography } from '@/common/ui'
import { LoaderBlock } from '@/common/ui/loader/LoaderBlock'
import { paymentsApi } from '@/entities/payments'

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

  return newArray
}

export const MyPayments = () => {
  //   const { data, isLoading } = paymentsApi.useGetMyPaymentsQuery()           //раскомент после тестир-ия
  //   const [payments, setPayments] = useState(data?.slice(0, paymentsPortion))         //раскомент после тестир-ия

  const paymentsTotalCount = 300 // для тест-ия
  const [currentPage, setCurrentPage] = useState(1)
  const [paymentsPortion, setPaymentsPortion] = useState(10)
  const [payments, setPayments] = useState(getArray(0, Number(paymentsPortion), paymentsTotalCount)) // для теста

  const handleCurrentPageChange = (page: number) => {
    setCurrentPage(page)
    setPayments(getArray(paymentsPortion * (page - 1), paymentsPortion * page, paymentsTotalCount)) // для теста
    // setPayments(data?.slice(paymentsPortion * (page - 1), paymentsPortion * page))       //раскомент после тестир-ия
  }

  const handlePaymentsPortionChange = (portion: string) => {
    if (currentPage > paymentsTotalCount / Number(portion)) {
      const lastPage = paymentsTotalCount / Number(portion)

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
    // setPayments(data?.slice(Number(portion) * (currentPage - 1), Number(portion) * currentPage))          //раскомент после тестир-ия
  }
  let pagesCount = 0
  let isShowPagination = false

  //   if (data?.length) {
  //     pagesCount = Math.ceil(data.length / Number(paymentsPortion))
  //     isShowPagination = pagesCount > 1
  //   }

  if (paymentsTotalCount) {
    pagesCount = Math.ceil(paymentsTotalCount / Number(paymentsPortion))
    isShowPagination = pagesCount > 1
  }

  return (
    <div className={'relative'}>
      {/* {isLoading && <LoaderBlock />} */}
      {/* {!isLoading && data?.length === 0 ? (
        <Typography> You do not have any subscriptions yet</Typography>
      ) : ( */}
      <table className={'w-full h-full table-fixed'}>
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
          {payments?.map(payment => (
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
