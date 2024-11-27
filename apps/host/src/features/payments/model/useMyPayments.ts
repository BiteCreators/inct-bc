import { useState } from 'react'

import { paymentsApi } from '@/entities/payments'

export const useMyPayments = () => {
  const { data, isLoading } = paymentsApi.useGetMyPaymentsQuery()
  const [currentPage, setCurrentPage] = useState(1)
  const [dataPortion, setDataPortion] = useState(10)
  const [dataforDisplay, setDataForDisplay] = useState(data?.slice(0, dataPortion))

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
    dataPortion,
    dataforDisplay,
    handleCurrentPageChange,
    handlePaymentsPortionChange,
    isLoading,
    pagesCount,
  }
}
