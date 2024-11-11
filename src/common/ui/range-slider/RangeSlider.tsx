import React from 'react'

import * as SliderPrimitive from '@radix-ui/react-slider'

type Props = {
  setZoom: (zoom: number) => void
  zoom: number
}

export const RangeSlider = ({ setZoom, zoom }: Props) => (
  <form>
    <SliderPrimitive.Root
      className={'cursor-pointer select-none relative flex items-center w-[100px] h-[20px]'}
      max={150} // Максимум 3 (150 / 50 = 3)
      min={50} // Минимум 1 (50 / 50 = 1)
      onValueChange={values => setZoom(values[0] / 50)} // Преобразование значения слайдера в зум
      step={1}
      value={[zoom * 50]} // Привязка состояния зума к значению слайдера
    >
      <SliderPrimitive.Track className={'relative flex-grow h-[2px] bg-light-100 rounded-full'}>
        <SliderPrimitive.Range className={'absolute h-full bg-primary-500 rounded-full'} />
      </SliderPrimitive.Track>

      <SliderPrimitive.Thumb
        aria-label={'Zoom'}
        className={
          'block w-[12px] h-[12px] bg-light-100 border-[3px] border-primary-500 rounded-full'
        }
      />
    </SliderPrimitive.Root>
  </form>
)
