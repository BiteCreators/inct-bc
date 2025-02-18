import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

export const useAccountManagement = () => {
  const [paymentModal, setPaymentModal] = useState({ isOpen: false, status: '' })

  const router = useRouter()

  useEffect(() => {
    if (router.query.success === 'true') {
      setPaymentModal({ isOpen: true, status: 'Success' })
    }

    if (router.query.success === 'false') {
      setPaymentModal({ isOpen: true, status: 'Error' })
    }
  }, [router.query.success])

  const handelModalClose = () => {
    setPaymentModal({ isOpen: false, status: '' })

    if (router.query.success !== undefined) {
      router.push(
        {
          pathname: router.pathname,
          query: {
            id: router.query.id,
            tab: 'account-management',
          },
        },
        undefined,
        { shallow: true }
      )
    }
  }

  return {
    handelModalClose,
    paymentModal,
  }
}
