import React from 'react'

import * as SliderPrimitive from '@radix-ui/react-slider'

export const RangeSlider = () => (
  <form>
    <SliderPrimitive.Root
      className={'cursor-pointer select-none relative flex items-center w-[100px] h-[20px]'}
      defaultValue={[50]}
      max={100}
      step={1}
    >
      <SliderPrimitive.Track className={'relative flex-grow h-[2px] bg-light-100 rounded-full'}>
        <SliderPrimitive.Range className={'absolute h-full bg-primary-500 rounded-full'} />
      </SliderPrimitive.Track>

      <SliderPrimitive.Thumb
        aria-label={'Volume'}
        className={
          'block w-[12px] h-[12px] bg-light-100 border-[3px] border-primary-500 rounded-full'
        }
      />
    </SliderPrimitive.Root>
  </form>
)
