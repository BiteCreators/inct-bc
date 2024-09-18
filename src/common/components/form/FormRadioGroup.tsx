import { FieldValues, useController } from 'react-hook-form'

import { RadioGroup, RadioGroupProps } from '@/common/components/radioGroup/RadioGroup'

import { FormFieldProps } from './types'

type Props<T extends FieldValues> = FormFieldProps<T> & RadioGroupProps

export const FormRadioGroup = <T extends FieldValues>({
  control,
  name,
  rules,
  ...props
}: Props<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name, rules })

  return <RadioGroup {...field} error={error?.message} {...props} />
}
