import { Ref, SVGProps, forwardRef, memo } from 'react'
const SvgBlock = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={20}
    ref={ref}
    width={32}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <rect
      height={'24'}
      rx={'2'}
      stroke={'currentColor'}
      strokeWidth={'2'}
      transform={'rotate(90 25 1)'}
      width={'18'}
      x={'25'}
      y={'-2'}
    />
    <defs>
      <clipPath id={'horizontal_orientation_svg__a'}>
        <path d={'M0 0h24v24H0z'} fill={'currentcolor'} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgBlock)
const Memo = memo(ForwardRef)

export default Memo
