import { Ref, SVGProps, forwardRef, memo } from 'react'
const SvgDesktopMac = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={36}
    ref={ref}
    width={36}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path
      d={
        'M31.5 3h-27c-1.65 0-3 1.35-3 3v18c0 1.65 1.35 3 3 3H15l-3 4.5V33h12v-1.5L21 27h10.5c1.65 0 3-1.35 3-3V6c0-1.65-1.35-3-3-3m0 18h-27V6h27z'
      }
      fill={'#fff'}
    />
  </svg>
)
const ForwardRef = forwardRef(SvgDesktopMac)
const Memo = memo(ForwardRef)

export default Memo
