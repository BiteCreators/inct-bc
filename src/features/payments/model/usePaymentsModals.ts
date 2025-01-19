import { useRouter } from 'next/router'

export const usePaymentsModals = ({
  setPaymentFailed,
  setPaymentSuccess,
}: {
  setPaymentFailed: (failed: boolean) => void
  setPaymentSuccess: (success: boolean) => void
}) => {
  const router = useRouter()

  const removeSuccessFromUrl = () => {
    const { success, ...tab } = router.query

    router.push(
      {
        pathname: router.pathname,
        query: tab,
      },
      undefined,
      { shallow: true }
    )
  }

  const handleSuccess = () => {
    setPaymentSuccess(false)
    removeSuccessFromUrl()
  }

  const handleFailed = () => {
    setPaymentFailed(false)
    removeSuccessFromUrl()
  }

  return {
    handleFailed,
    handleSuccess,
  }
}
