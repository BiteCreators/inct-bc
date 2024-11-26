import { useState } from 'react'

import { TableData } from './TableWithPagination'

export const useTableWithPagination = (data: TableData[]) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [dataPortion, setDataPortion] = useState(10)
  const [dataforDisplay, setDataForDisplay] = useState(data.slice(0, dataPortion))

  const handleCurrentPageChange = (page: number) => {
    setCurrentPage(page)
    setDataForDisplay(data.slice(dataPortion * (page - 1), dataPortion * page))
  }

  const handlePaymentsPortionChange = (portion: string) => {
    if (data.length) {
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
  let isShowPagination = false

  if (data.length) {
    pagesCount = Math.ceil(data.length / dataPortion)
    isShowPagination = pagesCount >= 1
  }

  return {
    currentPage,
    dataPortion,
    dataforDisplay,
    handleCurrentPageChange,
    handlePaymentsPortionChange,
    isShowPagination,
    pagesCount,
  }
}
