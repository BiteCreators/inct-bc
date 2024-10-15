import { Ref, SVGProps, forwardRef, memo } from 'react'
const SvgChromeSvgrepoCom = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={800}
    ref={ref}
    viewBox={'0 0 15 15'}
    width={800}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path
      d={'M2.503 1.907A7.47 7.47 0 0 1 7.5 0a7.5 7.5 0 0 1 6.635 4H7.5a3.5 3.5 0 0 0-3.23 2.149z'}
      fill={'#fff'}
    />
    <path
      d={
        'M1.745 2.69a7.503 7.503 0 0 0 3.41 11.937l2.812-3.658Q7.737 11 7.5 11a3.5 3.5 0 0 1-3.412-2.716.5.5 0 0 1-.05-.092z'
      }
      fill={'#fff'}
    />
    <path
      d={
        'M6.215 14.89Q6.842 15 7.5 15a7.5 7.5 0 0 0 7.072-10.005A1 1 0 0 1 14.5 5H9.95A3.5 3.5 0 0 1 11 7.5a3.5 3.5 0 0 1-.953 2.405z'
      }
      fill={'#fff'}
    />
    <path d={'M5 7.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0'} fill={'#fff'} />
  </svg>
)
const ForwardRef = forwardRef(SvgChromeSvgrepoCom)
const Memo = memo(ForwardRef)

export default Memo
