import { usePaymentsModals } from '@/features/payments/model/usePaymentsModals'
import { Button, Modal, Typography } from '@byte-creators/ui-kit'

type Props = {
  paymentFailed: boolean
  paymentSuccess: boolean
  setPaymentFailed: (failed: boolean) => void
  setPaymentSuccess: (success: boolean) => void
}

export const PaymentsModals = ({
  paymentFailed,
  paymentSuccess,
  setPaymentFailed,
  setPaymentSuccess,
}: Props) => {
  const { handleFailed, handleSuccess } = usePaymentsModals({ setPaymentFailed, setPaymentSuccess })

  return (
    <>
      <Modal
        isOpen={paymentSuccess}
        mode={'default'}
        onOpenChange={handleSuccess}
        title={'Success'}
      >
        <Typography variant={'medium-text'}>Payment was successful!</Typography>
        <Button className={'w-80 mt-12 mb-3'} onClick={handleSuccess}>
          OK
        </Button>
      </Modal>
      <Modal isOpen={paymentFailed} mode={'default'} onOpenChange={handleFailed} title={'Error'}>
        <Typography variant={'medium-text'}>Transaction failed, please try again</Typography>
        <Button className={'w-80 mt-12 mb-3'} onClick={handleFailed}>
          OK
        </Button>
      </Modal>
    </>
  )
}
