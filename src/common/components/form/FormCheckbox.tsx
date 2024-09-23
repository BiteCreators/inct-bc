import React, { ComponentProps } from 'react'
import { FieldValues, useController } from 'react-hook-form'

import { Checkbox } from '../checkbox/Checkbox'
import { FormFieldProps } from './types'

type Props<T extends FieldValues> = {
  error?: string
  text?: React.ReactNode
} & ComponentProps<'input'> &
  FormFieldProps<T>

export const FormCheckbox = <T extends FieldValues>({
  control,
  defaultValue,
  error,
  name,
  rules,
  text,
  ...props
}: Props<T>) => {
  const { field, fieldState } = useController({ control, name, rules })

  return <Checkbox {...field} text={text} {...props} error={error ?? fieldState.error?.message} />
}
