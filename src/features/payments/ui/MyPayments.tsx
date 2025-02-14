import React, { useEffect } from 'react'

import { Button, Loader, Pagination, Table, Typography } from '@byte-creators/ui-kit'
import { ArrowBackOutline } from '@byte-creators/ui-kit/icons'

import { useMyPayments } from '../model/useMyPayments'

export const MyPayments = () => {
  const {
    currentPage,
    dataForDisplay,
    dataPortion,
    handleCurrentPageChange,
    handlePaymentsPortionChange,
    isLoading,
    pagesCount,
    pagesPortionOptions,
    paymentFailed,
    paymentSuccess,
    payments,
    router,
    setPaymentFailed,
    setPaymentSuccess,
    t,
    userId,
  } = useMyPayments()

  useEffect(() => {
    if (router.query.success === 'true') {
      setPaymentSuccess(true)
    }

    if (router.query.success === 'false') {
      setPaymentFailed(true)
    }
  }, [router.query.success])

  const headers = [
    {
      name: t.dateOfPayment,
    },
    {
      name: t.endDateOfSubscription,
    },
    {
      name: t.price,
    },
    {
      name: t.subscriptionType,
    },
    {
      name: t.paymentType,
    },
  ]

  const renderLoader = () => (
    <div className={'flex justify-center pt-11'}>
      <Loader />
    </div>
  )

  const renderEmptyMessage = () => (
    <div className={'flex justify-center items-center'}>
      <Button
        className={'bg-transparent'}
        onClick={() => router.push(`/profile/${userId}/settings`)}
        variant={'icon'}
      >
        <ArrowBackOutline />
      </Button>
      <Typography>You do not have any subscriptions yet</Typography>
    </div>
  )

  const renderTableWithPagination = () => (
    <div>
      <Table headers={headers} tableData={payments} />
      <Pagination
        className={'hidden sm:inline-flex sm:self-start sm:w-auto sm:mt-9 sm:mb-16'}
        currentPage={currentPage}
        onChangePagesPortion={handlePaymentsPortionChange}
        onClickPaginationButton={handleCurrentPageChange}
        pagesCount={pagesCount}
        pagesPortionOptions={pagesPortionOptions}
      />
    </div>
  )

  return (
    <div className={'relative mb-12 sm:flex sm:flex-col'}>
      {isLoading && renderLoader()}
      {!isLoading && dataForDisplay && dataForDisplay.length === 0 && renderEmptyMessage()}
      {!isLoading && dataForDisplay && dataForDisplay.length > 0 && renderTableWithPagination()}
    </div>
  )
}
