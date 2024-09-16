import { Control, FieldPath, FieldValues } from 'react-hook-form'

export type FormFieldProps<T extends FieldValues> = {
  control?: Control<T>
  name: FieldPath<T>
  rules?: Record<string, unknown>
}
