import React from 'react'

import { SelectItem, SelectSideTop } from '@byte-creators/ui-kit'
import { HorizontalOrientation, Square, VerticalOrientation } from '@byte-creators/ui-kit/icons'

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
