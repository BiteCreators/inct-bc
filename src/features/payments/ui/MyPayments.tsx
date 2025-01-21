import Skeleton from 'react-loading-skeleton'

import { MyPayment } from '@/entities/payments'
import { Loader, Pagination, Table, TableData, Typography } from '@byte-creators/ui-kit'
import { useScopedTranslation } from '@byte-creators/utils'

import { useMyPayments } from '../model/useMyPayments'

export const MyPayments = () => {
  const t = useScopedTranslation('Payments')
  const {
    currentPage,
    dataPortion,
    dataforDisplay,
    handleCurrentPageChange,
    handlePaymentsPortionChange,
    isLoading,
    pagesCount,
  } = useMyPayments()

  let payments = [] as TableData[]

  if (dataforDisplay) {
    const paymentsForDisplay = [...dataforDisplay] as Partial<MyPayment>[]

    paymentsForDisplay.forEach(el => {
      delete el.userId
      delete el.subscriptionId
    })
    payments = dataforDisplay?.map((el: any) => {
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
        currentPage={1}
        onChangePagesPortion={() => {}}
        onClickPaginationButton={() => {}}
        pagesCount={2}
        pagesPortion={'5'}
      />
    </div>
  )

  return (
    <div className={'relative mb-12 sm:flex sm:flex-col'}>
      {isLoading && renderLoader()}
      {!isLoading && dataforDisplay && dataforDisplay.length === 0 && renderEmptyMessage()}
      {!isLoading && dataforDisplay && dataforDisplay.length > 0 && renderTableWithPagination()}
    </div>
  )
}
