import React, { ReactNode } from 'react'

import { Typography } from '@/common/ui'
import { Slider } from '@/common/ui/slider/Slider'

import exampleImage from '../../../../public/examples/image2.png'

type Props = {
  slides: ReactNode[]
}

export const ImageFiltersModal = ({ slides }: Props) => {
  const nameFilters = [
    'Normal',
    'Clarendon',
    'Lark',
    'Gingham',
    'Moon',
    'Clarendon',
    'Lark',
    'Gingham',
    'Moon',
  ]

  return (
    <div className={'flex'}>
      <div className={'w-1/2'}>
        <Slider duration={0} slides={slides} />
      </div>
      <div className={'w-1/2 grid grid-cols-3 gap-x-6 gap-y-[18px] px-14 py-6'}>
        {nameFilters.map((el, index) => (
          <button key={index}>
            <div className={'flex flex-col gap-2 items-center'}>
              <div className={'w-[108px] h-[108px]'}>
                <img alt={'oops'} className={'w-full h-full'} src={exampleImage.src} />
              </div>
              <Typography>{el}</Typography>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
