import { StripeSvgrepoCom4 } from '@/common/assets/icons/components'

type Props = {}
export const StripePaymentButton = ({}: Props) => {
  return (
    <button className={'w-20 h-11 bg-dark-500 px-3 rounded border border-dark-300'}>
      <StripeSvgrepoCom4 height={30} viewBox={'2 3 24 9'} width={70} />
    </button>
  )
}
