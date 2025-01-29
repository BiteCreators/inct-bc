import { useEffect, useState } from 'react'

import { MyPayment, paymentsApi } from '@/entities/payments'

export const useMyPayments = () => {
  const { data, isLoading } = paymentsApi.useGetMyPaymentsQuery()
  const [currentPage, setCurrentPage] = useState(1)
  const [dataPortion, setDataPortion] = useState(10)
  const [dataForDisplay, setDataForDisplay] = useState<MyPayment[] | undefined>([])

  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [paymentFailed, setPaymentFailed] = useState(false)

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

  return {
    currentPage,
    dataForDisplay,
    dataPortion,
    handleCurrentPageChange,
    handlePaymentsPortionChange,
    isLoading,
    pagesCount,
    paymentFailed,
    paymentSuccess,
    setPaymentFailed,
    setPaymentSuccess,
  }
}
