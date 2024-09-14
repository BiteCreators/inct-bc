import React, { ReactNode } from 'react'

import { cn } from '@/common/utils/cn'

const typographyVariants = {
  bold_text_14: 'text-sm font-bold leading-5', // Жирный текст 14px с весом bold и межстрочным интервалом 20px
  bold_text_16: 'text-base font-bold leading-6', // Жирный текст 16px с весом bold и межстрочным интервалом 24px
  h1: 'text-[28px] font-bold leading-9', // Заголовок H1 с размером 28px, жирностью и межстрочным интервалом 36px
  h2: 'text-2xl font-semibold leading-8', // Заголовок H2 с размером 24px, весом 600 и межстрочным интервалом 32px
  h3: 'text-xl font-medium leading-7', // Заголовок H3 с размером 20px, весом 500 и межстрочным интервалом 28px
  large: 'text-[32px] font-bold', // Класс для текста с размером 32px и жирностью bold
  medium_text_14: 'text-sm font-medium leading-5', // Текст 14px с весом 500 и межстрочным интервалом 20px
  regular_link: 'text-sm font-normal text-blue-500 underline', // Обычная ссылка с размером 14px, весом 400, цветом синий и подчеркиванием
  regular_text_14: 'text-sm font-normal leading-5', // Обычный текст 14px с весом 400 и межстрочным интервалом 20px
  regular_text_16: 'text-base font-normal leading-6', // Обычный текст 16px с весом 400 и межстрочным интервалом 24px
  semi_bold_small_text: 'text-xs font-semibold leading-4', // Полужирный мелкий текст 12px с весом 600 и межстрочным интервалом 16px
  small_link: 'cursor-pointer text-xs cursor-font-normal text-blue-500 underline', // Мелкая ссылка с размером 12px, весом 400, цветом синий и подчеркиванием
  small_text: 'cursor-pointer text-xs font-normal leading-4', // Обычный мелкий текст 12px с весом 400 и межстрочным интервалом 16px
}

type TypographyProps = {
  children: ReactNode
  className?: string
  variant?: keyof typeof typographyVariants
}

export default function Typography({
  children,
  className,
  variant = 'regular_text_16',
}: TypographyProps) {
  const classes = cn(typographyVariants[variant], className)

  return React.createElement(variant, { className: classes }, children)
}
