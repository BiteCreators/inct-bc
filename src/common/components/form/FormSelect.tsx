import { FieldValues, useController } from 'react-hook-form'

import { Select, SelectProps } from '../select/Select'
import { FormFieldProps } from './types'

type Props<T extends FieldValues> = FormFieldProps<T> & SelectProps

export const FormSelect = <T extends FieldValues>({
  control,
  defaultValue,
  name,
  rules,
  ...props
}: Props<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name, rules })

  return <Select {...field} error={error?.message} {...props} onValueChange={field.onChange} />
}
