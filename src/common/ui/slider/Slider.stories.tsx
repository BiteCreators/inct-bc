import type { Meta, StoryObj } from '@storybook/react'

import { Slider } from './Slider'

const meta: Meta<typeof Slider> = {
  argTypes: {
    duration: {
      description: 'Скорость обновления слайдов, если ноль то обновление слайдов отключено.',
    },
    height: {
      description: 'Высота слайдера, по умолчанию 560px.',
    },
    slides: {
      description: 'Обязательный Props - массив React Nodes',
    },
    stylesSlide: {
      description: 'Дополнительные стили для слайда.',
    },
    stylesSlider: {
      description: 'Дополнительные стили для слайдера.',
    },
  },
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

const slides = [
  <img
    alt={'sliderImg'}
    className={'w-full h-full object-cover object-center'}
    key={1}
    src={'https://i1.sndcdn.com/artworks-nO3R0izz9UnXtHhQ-z1R29Q-t500x500.jpg'}
  />,
  <img
    alt={'sliderImg'}
    className={'w-full h-full object-cover object-center'}
    key={2}
    src={'https://i1.sndcdn.com/artworks-000066235753-ysrir2-t500x500.jpg'}
  />,
  <img
    alt={'sliderImg'}
    className={'w-full h-full object-cover object-center'}
    key={3}
    src={'https://i1.sndcdn.com/artworks-000022548343-t02iuc-t500x500.jpg'}
  />,
]

export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {
  args: {
    duration: 4000,
    height: '560',
    slides: slides,
    stylesSlide: 'justify-items-center',
    stylesSlider: 'w-full md:w-[500px]',
  },
}
