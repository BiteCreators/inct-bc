import { useEffect, useState } from 'react'

import { MyPayment, paymentsApi } from '@/entities/payments'
import { useRouter } from 'next/router'

export const useMyPayments = () => {
  const { data, isLoading } = paymentsApi.useGetMyPaymentsQuery()
  const [currentPage, setCurrentPage] = useState(1)
  const [dataPortion, setDataPortion] = useState(10)
  const [dataForDisplay, setDataForDisplay] = useState<MyPayment[] | undefined>([])

  const [paymentModal, setPaymentModal] = useState({ isOpen: false, status: '' })

  const router = useRouter()

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

  const handelModalClose = () => {
    setPaymentModal({ isOpen: false, status: '' })

    if (router.query.success !== undefined) {
      router.push(
        {
          pathname: router.pathname,
          query: {
            id: router.query.id,
            tab: 'my-payments',
          },
        },
        undefined,
        { shallow: true }
      )
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
    handelModalClose,
    handleCurrentPageChange,
    handlePaymentsPortionChange,
    isLoading,
    pagesCount,
    paymentModal,
    setPaymentModal,
  }
}
