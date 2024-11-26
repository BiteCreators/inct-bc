// import { paymentsApi } from '@/entities/payments'
import { Loader, TableWithPagination, Typography } from '@packages/shared/ui'

export type Header = {
  name: string
  onClickSortButton?: () => void
  sort?: 'asc' | 'desc' | null
}

export const MyPayments = () => {
  // const { data, isLoading } = paymentsApi.useGetMyPaymentsQuery()

  // if (!data) {
  //   return
  // }
  const isLoading = false //для тестов
  const arr = getArray(0, 73, 73) //для тестов
  const data: any = [...arr] //для тестов

  data?.forEach((el: any) => {
    delete el.userId
    delete el.subscriptionId
  })
  const payments = data?.map((el: any) => {
    return {
      1: new Date(el.dateOfPayment).toLocaleDateString(),
      2: new Date(el.endDateOfSubscription).toLocaleDateString(),
      3: `$${el.price}`,
      4: el.subscriptionType,
      5: el.paymentType,
    }
  })

  const headers: Header[] = [
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
      {!isLoading && data.length === 0 ? (
        <Typography> You do not have any subscriptions yet</Typography>
      ) : (
        <TableWithPagination headers={headers} tableData={payments} />
      )}
    </div>
  )
}

// для тестир-ия:
function getArray(start: number, end: number, total: number) {
  const payments = Array.from({ length: total }, (_, ind) => ({
    dateOfPayment: '2024-11-05T18:42:55.367Z',
    endDateOfSubscription: '2024-11-05T18:42:55.367Z',
    paymentType: `${ind % 2 === 0 ? 'Paypal' : 'Stripe'}`,
    price: ind,
    subscriptionId: '',
    subscriptionType: `${ind % 2 === 0 ? '1 day' : '1 month'}`,
    userId: 0,
  }))

  return payments.slice(start, end)
}
