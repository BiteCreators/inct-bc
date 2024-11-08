import { useState } from 'react'

import { Pagination, Typography } from '@/common/ui'
import { LoaderBlock } from '@/common/ui/loader/LoaderBlock'
import { paymentsApi } from '@/entities/payments'

import { useMyPayments } from '../model/useMyPayments'

export const MyPayments = () => {
  const { data, isLoading } = paymentsApi.useGetMyPaymentsQuery()
  const {
    currentPage,
    handleCurrentPageChange,
    handlePaymentsPortionChange,
    isShowPagination,
    pagesCount,
    payments,
    paymentsPortion,
  } = useMyPayments(data)

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
          className={'mt-9 mb-16 w-auto'}
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
