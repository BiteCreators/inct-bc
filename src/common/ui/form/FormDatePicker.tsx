import { FieldValues, useController } from 'react-hook-form'

import Link from 'next/link'

import { DatePicker } from '../datepicker/DatePicker'
import { FormFieldProps } from './types'

type Props<T extends FieldValues> = {
  className?: string
  disabled?: boolean
  error?: React.ReactNode
  inputClassName: string
  label?: string
  mode: 'range' | 'single'
  placeholder?: string
  required?: boolean
} & FormFieldProps<T>

export const FormDatePicker = <T extends FieldValues>({
  control,
  error,
  name,
  ...props
}: Props<T>) => {
  const {
    field: { onChange, value, ...field },
    fieldState,
  } = useController({ control, name })

  const fieldError = fieldState.error?.message && errorWithLink(fieldState.error?.message)

  return (
    <DatePicker
      onDateChange={onChange}
      selectedDate={value}
      {...field}
      {...props}
      error={error ?? fieldError}
    />
  )
}

function errorWithLink(message: string) {
  const errorAsArray = message.split('.')
  const errorText = errorAsArray[0]
  const errorLink = errorAsArray[1]

  return errorAsArray.length > 1 ? (
    <p>
      {errorText + '. '}
      <Link className={'underline'} href={'/auth/sign-up/privacy-policy'}>
        {errorLink}
      </Link>
    </p>
  ) : (
    <p>{errorText}</p>
  )
}
