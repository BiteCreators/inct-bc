import React, { ComponentProps } from 'react'

import IconSprite from './../../assets/Sprite.svg'

type Props = {
  height?: string
  iconId: string
  transform?: string
  viewBox?: string
  width?: string
} & ComponentProps<'svg'>

export const Icon = ({ className, height, iconId, transform, viewBox, width }: Props) => {
  return (
    <svg
      className={className}
      height={height || '40'}
      transform={transform}
      viewBox={viewBox || '0 0 40 40'}
      width={width || '40'}
      xmlns={'http://www.w3.org/2000/svg'}
    >
      <use xlinkHref={`${IconSprite.src}#${iconId}`} />
    </svg>
  )
}
