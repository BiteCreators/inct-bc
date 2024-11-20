import { Button, Modal, Typography } from '@packages/shared/ui'

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
  return (
    <>
      <Modal
        isOpen={paymentSuccess}
        mode={'default'}
        onOpenChange={() => setPaymentSuccess(false)}
        title={'Success'}
      >
        <Typography variant={'medium-text'}>Payment was successful!</Typography>
        <Button className={'w-80 mt-12 mb-3'}>OK</Button>
      </Modal>
      <Modal
        isOpen={paymentFailed}
        mode={'default'}
        onOpenChange={() => setPaymentFailed(false)}
        title={'Error'}
      >
        <Typography variant={'medium-text'}>Transaction failed, please try again</Typography>
        <Button className={'w-80 mt-12 mb-3'}>Back to payment</Button>
      </Modal>
    </>
  )
}
