import React from 'react'

import { HorizontalOrientation, Square, VerticalOrientation } from '@packages/shared/assets'
import { SelectItem } from '@packages/shared/ui'
import { SelectSideTop } from '@packages/shared/ui/select-side-top/SelectSideTop'

type Props = {
  setAspect: (aspect: number) => void
}

export const AspectRatio = ({ setAspect }: Props) => {
  return (
    <SelectSideTop
      defaultValue={'1'}
      onValueChange={value => {
        if (value === '1') {
          setAspect(1)
        }
        if (value === '2') {
          setAspect(4 / 5)
        }
        if (value === '3') {
          setAspect(16 / 9)
        }
      }}
    >
      <SelectItem value={'1'}>
        <Square />
        <span>1:1</span>
      </SelectItem>
      <SelectItem value={'2'}>
        <VerticalOrientation />
        <span>4:5</span>
      </SelectItem>
      <SelectItem value={'3'}>
        <HorizontalOrientation />
        <span>16:9</span>
      </SelectItem>
    </SelectSideTop>
  )
}
