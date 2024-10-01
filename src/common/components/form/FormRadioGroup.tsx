import { FieldValues, useController } from 'react-hook-form'

import { RadioGroup, RadioGroupProps } from '../radio-group/RadioGroup'
import { FormFieldProps } from './types'

type Props<T extends FieldValues> = FormFieldProps<T> & RadioGroupProps

export const FormRadioGroup = <T extends FieldValues>({
  control,
  error,
  name,
  rules,
  ...props
}: Props<T>) => {
  const { field, fieldState } = useController({ control, name, rules })

  return <RadioGroup {...field} error={error ?? fieldState.error?.message} {...props} />
}
