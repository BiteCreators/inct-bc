import { useState } from 'react'

import { MyPayment } from '@/entities/payments'

export const useMyPayments = (data: MyPayment[] | undefined) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [paymentsPortion, setPaymentsPortion] = useState(10)
  const [payments, setPayments] = useState(data?.slice(0, paymentsPortion))

  const handleCurrentPageChange = (page: number) => {
    setCurrentPage(page)
    setPayments(data?.slice(paymentsPortion * (page - 1), paymentsPortion * page))
  }

  const handlePaymentsPortionChange = (portion: string) => {
    if (data?.length) {
      const lastPage = data?.length / Number(portion)

      if (currentPage > lastPage) {
        setCurrentPage(lastPage)
        setPayments(data?.slice(Number(portion) * (lastPage - 1), Number(portion) * lastPage))
      } else {
        setPayments(data?.slice(Number(portion) * (currentPage - 1), Number(portion) * currentPage))
      }
      setPaymentsPortion(Number(portion))
    }
  }
  let pagesCount = 0
  let isShowPagination = false

  if (data?.length) {
    pagesCount = Math.ceil(data.length / paymentsPortion)
    isShowPagination = pagesCount > 1
  }

  return {
    currentPage,
    handleCurrentPageChange,
    handlePaymentsPortionChange,
    isShowPagination,
    pagesCount,
    payments,
    paymentsPortion,
  }
}
