import { Button, Modal, Typography } from '@/common/ui'

type Props = {
  paymentSuccess: boolean
  paymentFailed: boolean
  setPaymentSuccess: (success: boolean) => void
  setPaymentFailed: (failed: boolean) => void
}

export const PaymentsModals = ({
  paymentSuccess,
  setPaymentSuccess,
  setPaymentFailed,
  paymentFailed,
}: Props) => {
  return (
    <>
      <Modal
        isOpen={paymentSuccess}
        mode={'default'}
        title={'Success'}
        onOpenChange={() => setPaymentSuccess(false)}
      >
        <Typography variant={'medium-text'}>Payment was successful!</Typography>
        <Button className={'w-80 mt-12 mb-3'}>OK</Button>
      </Modal>
      <Modal
        isOpen={paymentFailed}
        mode={'default'}
        title={'Error'}
        onOpenChange={() => setPaymentFailed(false)}
      >
        <Typography variant={'medium-text'}>Transaction failed, please try again</Typography>
        <Button className={'w-80 mt-12 mb-3'}>Back to payment</Button>
      </Modal>
    </>
  )
}
