type LoaderOption = {
  disabled: boolean
  label: string
  value: string
}

export const loaderOptions: LoaderOption[] = [
  { disabled: false, label: 'Default (spinner)', value: 'Default (spinner)' },
  { disabled: false, label: 'Memory card game', value: 'Memory card game' },
  { disabled: false, label: 'Snake game', value: 'Snake game' },
]
