import React from 'react'
import { FieldValues, useController } from 'react-hook-form'

import Link from 'next/link'

import { DatePicker } from '../datepicker/DatePicker'
import { Trans } from '../trans/Trans'
import { FormFieldProps } from './types'

type Props<T extends FieldValues> = {
  className?: string
  disabled?: boolean
  error?: React.ReactNode
  inputClassName?: string
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

  const fieldError = fieldState.error?.message && (
    <Trans
      tags={{
        1: text => (
          <Link className={'underline'} href={'/auth/sign-up/privacy-policy'}>
            {text}
          </Link>
        ),
      }}
      text={fieldState.error?.message}
    ></Trans>
  )

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
