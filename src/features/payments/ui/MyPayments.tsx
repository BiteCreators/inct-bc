import { useState } from 'react'

import { Pagination, Typography } from '@/common/ui'
import { LoaderBlock } from '@/common/ui/loader/LoaderBlock'
import { paymentsApi } from '@/entities/payments'

export const MyPayments = () => {
  const { data, isLoading } = paymentsApi.useGetMyPaymentsQuery()
  const [currentPage, setCurrentPage] = useState(1)
  const [paymentsPortion, setPaymentsPortion] = useState(10)
  const [payments, setPayments] = useState(data?.slice(0, paymentsPortion))

  const handleCurrentPageChange = (page: number) => {
    setCurrentPage(page)
    setPayments(data?.slice(paymentsPortion * (page - 1), paymentsPortion * page))
  }

  const handlePaymentsPortionChange = (portion: string) => {
    if (data?.length) {
      const lastPage = data?.length / Number(portion)

      if (currentPage > lastPage) {
        setCurrentPage(lastPage)
        setPayments(data?.slice(Number(portion) * (lastPage - 1), Number(portion) * lastPage))
      } else {
        setPayments(data?.slice(Number(portion) * (currentPage - 1), Number(portion) * currentPage))
      }
      setPaymentsPortion(Number(portion))
    }
  }
  let pagesCount = 0
  let isShowPagination = false

  if (data?.length) {
    pagesCount = Math.ceil(data.length / paymentsPortion)
    isShowPagination = pagesCount > 1
  }

  return (
    <div className={'relative'}>
      {isLoading && <LoaderBlock />}
      {!isLoading && data?.length === 0 ? (
        <Typography> You do not have any subscriptions yet</Typography>
      ) : (
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
      )}

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
