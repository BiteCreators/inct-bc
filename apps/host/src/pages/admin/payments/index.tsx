import dynamic from 'next/dynamic'

const PaymentsPage = dynamic(() => import('admin/payments-page').then(mod => mod.PaymentsPage))

export default function Page() {
  return <PaymentsPage />
}
