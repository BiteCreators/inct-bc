import React, { ComponentProps } from 'react'

type ButtonProps = {
  variant?: 'outlined' | 'primary' | 'secondary' | 'text'
} & ComponentProps<'button'>

export const Button = ({ variant = 'primary', ...props}: ButtonProps) => {
  return <button {...props} />
}
