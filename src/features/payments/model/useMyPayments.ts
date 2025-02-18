import { useEffect, useState } from 'react'

import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { authSlice } from '@/entities/auth'
import { MyPayment, paymentsApi } from '@/entities/payments'
import { TableData } from '@byte-creators/ui-kit'
import { useScopedTranslation } from '@byte-creators/utils'
import { useRouter } from 'next/router'

export const useMyPayments = () => {
  const { data, isLoading } = paymentsApi.useGetMyPaymentsQuery()

  const t = useScopedTranslation('Payments')
  const router = useRouter()
  const userId = useAppSelector(authSlice.selectors.selectUserId)
  const step = 6
  const [currentPage, setCurrentPage] = useState(1)
  const [dataPortion, setDataPortion] = useState(step)
  const [dataForDisplay, setDataForDisplay] = useState<MyPayment[] | undefined>([])
  
  const pagesPortionOptions = ['6', '8', '10', '20', '30', '50']
  
  useEffect(() => {
    setDataForDisplay(data?.slice(0, dataPortion))
  }, [data])

  const handleCurrentPageChange = (page: number) => {
    setCurrentPage(page)
    setDataForDisplay(data?.slice(dataPortion * (page - 1), dataPortion * page))
  }

  const handlePaymentsPortionChange = (portion: string) => {
    if (data?.length) {
      const lastPage = Math.round(data.length / Number(portion))

      if (currentPage > lastPage) {
        setCurrentPage(lastPage)
        setDataForDisplay(data.slice(Number(portion) * (lastPage - 1), Number(portion) * lastPage))
      } else {
        setDataForDisplay(
          data.slice(Number(portion) * (currentPage - 1), Number(portion) * currentPage)
        )
      }
      setDataPortion(Number(portion))
    }
  }

  let pagesCount = 0

  if (data?.length) {
    pagesCount = Math.ceil(data.length / dataPortion)
  }

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

  return {
    currentPage,
    dataForDisplay,
    dataPortion,
    handleCurrentPageChange,
    handlePaymentsPortionChange,
    isLoading,
    pagesCount,
    pagesPortionOptions,
    payments,
    router,
    t,
    userId,
  }
}
