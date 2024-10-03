import { FieldValues, useController } from 'react-hook-form'

import { Select } from '@/common/ui'
import { SelectProps } from '@/common/ui/select/Select'

import { FormFieldProps } from './types'

type Props<T extends FieldValues> = FormFieldProps<T> & SelectProps

export const FormSelect = <T extends FieldValues>({
  control,
  defaultValue,
  error,
  name,
  rules,
  ...props
}: Props<T>) => {
  const { field, fieldState } = useController({ control, name, rules })

  return (
    <Select
      {...field}
      error={error ?? fieldState.error?.message}
      {...props}
      onValueChange={field.onChange}
    />
  )
}
