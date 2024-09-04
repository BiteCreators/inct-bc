import React, { ComponentProps } from 'react'

type ButtonProps = {
  variant?: 'outlined' | 'primary' | 'secondary' | 'text'
} & ComponentProps<'button'>

export const Button = ({ variant = 'primary', ...props }: ButtonProps) => {
  // eslint-disable-next-line react/button-has-type
  return <button {...props} />
}
