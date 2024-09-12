import { ComponentPropsWithoutRef, ElementRef, Ref, forwardRef } from 'react'
import { Control, FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Input } from '@/common/components/input/Input'

type TextFieldProps<T extends FieldValues> = {
  inputType?: 'default' | 'reveal' | 'search'
  label?: string
} & ComponentPropsWithoutRef<'input'> &
  UseControllerProps<T>

export const TextField = forwardRef(
  <T extends FieldValues>(
    {
      control,
      defaultValue,
      inputType = 'default',
      label,
      name,
      rules,
      ...rest
    }: TextFieldProps<T>,
    ref: Ref<ElementRef<'input'>>
  ) => {
    const { field, fieldState } = useController<T>({
      control: control as Control<T>,
      defaultValue,
      name: name as FieldPath<T>,
      rules,
    })

    return (
      <Input
        {...field}
        error={fieldState.error?.message}
        inputType={inputType}
        label={label}
        {...rest}
        ref={ref}
      />
    )
  }
)

TextField.displayName = 'TextField'
