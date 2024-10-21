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
    slidesUrl: {
      description: 'Обязательный Props - массив ссылок на изображения.',
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
  'https://i1.sndcdn.com/artworks-nO3R0izz9UnXtHhQ-z1R29Q-t500x500.jpg',
  'https://i1.sndcdn.com/artworks-000066235753-ysrir2-t500x500.jpg',
  'https://i1.sndcdn.com/artworks-000022548343-t02iuc-t500x500.jpg',
]

export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {
  args: {
    duration: 4000,
    height: '560',
    slidesUrl: slides,
    stylesSlider: 'w-full md:w-[500px]',
  },
}
