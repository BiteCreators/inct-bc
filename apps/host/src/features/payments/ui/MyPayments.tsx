import { MyPayment } from '@/entities/payments'
import { Loader, Pagination, Table, TableData, Typography } from '@packages/shared/ui'

import { useMyPayments } from '../model/useMyPayments'

export const MyPayments = () => {
  // const isLoading = false //для тестов
  // const arr = getArray(0, 73, 73) //для тестов
  // const data: any = [...arr] //для тестов
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
      name: 'Date of Payment',
    },
    {
      name: 'End date of subscription',
    },
    {
      name: 'Price',
    },
    {
      name: 'Subscription Type',
    },
    {
      name: 'Payment Type',
    },
  ]

  return (
    <div className={'relative mb-12 sm:flex sm:flex-col'}>
      {isLoading && <Loader />}
      {!isLoading && dataforDisplay && dataforDisplay.length === 0 ? (
        <Typography> You do not have any subscriptions yet</Typography>
      ) : (
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
      )}
    </div>
  )
}

// для тестир-ия:
// function getArray(start: number, end: number, total: number) {
//   const payments = Array.from({ length: total }, (_, ind) => ({
//     dateOfPayment: '2024-11-05T18:42:55.367Z',
//     endDateOfSubscription: '2024-11-05T18:42:55.367Z',
//     paymentType: `${ind % 2 === 0 ? 'Paypal' : 'Stripe'}`,
//     price: ind,
//     subscriptionId: '',
//     subscriptionType: `${ind % 2 === 0 ? '1 day' : '1 month'}`,
//     userId: 0,
//   }))

//   return payments.slice(start, end)
// }
