import React, { useEffect } from 'react'

import { MyPayment } from '@/entities/payments'
import {
  Button,
  Loader,
  Modal,
  Pagination,
  Table,
  TableData,
  Typography,
} from '@byte-creators/ui-kit'
import { useScopedTranslation } from '@byte-creators/utils'
import { useRouter } from 'next/router'

import { useMyPayments } from '../model/useMyPayments'

export const MyPayments = () => {
  const t = useScopedTranslation('Payments')
  const {
    currentPage,
    dataForDisplay,
    dataPortion,
    handelModalClose,
    handleCurrentPageChange,
    handlePaymentsPortionChange,
    isLoading,
    pagesCount,
    paymentModal,
    setPaymentModal,
  } = useMyPayments()

  const router = useRouter()

  useEffect(() => {
    if (router.query.success === 'true') {
      setPaymentModal({ isOpen: true, status: 'Success' })
    }

    if (router.query.success === 'false') {
      setPaymentModal({ isOpen: true, status: 'Error' })
    }
  }, [router.query.success])

  let payments = [] as TableData[]

  if (dataForDisplay) {
    payments = dataForDisplay?.map((el: MyPayment) => {
      return {
        1: new Date(el.dateOfPayment).toLocaleDateString(),
        2: new Date(el.endDateOfSubscription).toLocaleDateString(),
        3: `$${el.price}`,
        4: el.subscriptionType,
        5: el.paymentType,
      }
    })
  }

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

  const renderEmptyMessage = () => <Typography>You do not have any subscriptions yet</Typography>

  const renderTableWithPagination = () => (
    <div>
      <Table headers={headers} tableData={payments} />
      <Pagination
        className={'hidden sm:inline-flex sm:self-start sm:w-auto sm:mt-9 sm:mb-16'}
        currentPage={currentPage}
        onChangePagesPortion={handlePaymentsPortionChange}
        onClickPaginationButton={handleCurrentPageChange}
        pagesCount={pagesCount}
        pagesPortion={dataPortion.toString()}
      />
    </div>
  )

  const renderModalPaymentStatus = () => (
    <Modal
      className={'mim-w-[360px]'}
      handleInteractOutside={handelModalClose}
      isOpen={paymentModal.isOpen}
      mode={'default'}
      onOpenChange={handelModalClose}
      title={paymentModal.status}
    >
      {paymentModal.status === 'Success' ? (
        <p className={'mb-16'}>Payment was successful!</p>
      ) : (
        <p className={'mb-16'}>Transaction failed. Please, write to support</p>
      )}
      <Button className={'w-full mb-6'} onClick={handelModalClose} variant={'primary'}>
        <span>OK</span>
      </Button>
    </Modal>
  )

  return (
    <div className={'relative mb-12 sm:flex sm:flex-col'}>
      {isLoading && renderLoader()}
      {!isLoading && dataForDisplay && dataForDisplay.length === 0 && renderEmptyMessage()}
      {!isLoading && dataForDisplay && dataForDisplay.length > 0 && renderTableWithPagination()}
      {renderModalPaymentStatus()}
    </div>
  )
}
