import { ComponentPropsWithoutRef } from 'react'
import { FieldValues, useController } from 'react-hook-form'

import { Input } from '../input/Input'
import { FormFieldProps } from './types'

type Props<T extends FieldValues> = {
  inputType?: 'default' | 'reveal' | 'search'
  label?: string
} & ComponentPropsWithoutRef<'input'> &
  FormFieldProps<T>

export const FormInput = <T extends FieldValues>({
  control,
  defaultValue,
  error,
  inputType = 'default',
  label,
  name,
  rules,
  ...rest
}: Props<T>) => {
  const { field, fieldState } = useController<T>({
    control,
    name,
    rules,
  })

  return (
    <Input
      {...field}
      error={error ?? fieldState.error?.message}
      inputType={inputType}
      label={label}
      {...rest}
    />
  )
}
