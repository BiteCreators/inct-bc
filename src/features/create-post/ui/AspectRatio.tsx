import {
  HorizontalOrientation,
  ImageOutline,
  Square,
  VerticalOrientation,
} from '@/common/assets/icons/components'

import { Select, SelectItem } from './Select'

export const AspectRatio = () => {
  return (
    <Select defaultValue={'1'} value={'1'}>
      <SelectItem value={'1'}>
        <span>Original</span>
        <ImageOutline />
      </SelectItem>
      <SelectItem value={'2'}>
        <span>1:1</span>
        <Square />
      </SelectItem>
      <SelectItem value={'3'}>
        <span>4:5</span>
        <VerticalOrientation />
      </SelectItem>
      <SelectItem value={'4'}>
        <span>16:9</span>
        <HorizontalOrientation />
      </SelectItem>
    </Select>
  )
}
