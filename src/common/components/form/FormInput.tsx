import { ComponentPropsWithoutRef, ElementRef, Ref } from 'react'
import { FieldValues, useController } from 'react-hook-form'

import { Input } from '@/common/components/input/Input'

import { FormFieldProps } from './types'

type TextFieldProps<T extends FieldValues> = {
  inputType?: 'default' | 'reveal' | 'search'
  label?: string
} & ComponentPropsWithoutRef<'input'> &
  FormFieldProps<T>

export const FormInput = <T extends FieldValues>({
  control,
  defaultValue,
  inputType = 'default',
  label,
  name,
  rules,
  ...rest
}: TextFieldProps<T>) => {
  const { field, fieldState } = useController<T>({
    control,
    name,
    rules,
  })

  return (
    <Input
      {...field}
      error={fieldState.error?.message}
      inputType={inputType}
      label={label}
      {...rest}
    />
  )
}
