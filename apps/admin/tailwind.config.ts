import type { Config } from 'tailwindcss'

import plugin from 'tailwindcss/plugin'

import baseConfig from '../../tailwind.config.base'

const config: Config = {
  ...baseConfig,
  content: ['./node_modules/@packages/shared/src/ui/**/*.{js,ts,jsx,tsx}'],
  plugins: [
    ...(baseConfig.plugins || []),
    plugin(({ addBase, theme }) => {
      const generateCssVars = (config: Record<string, any>, prefix: string) => {
        Object.entries(config).forEach(([property, propertyValue]) => {
          if (property === 'global-hover' || property === 'no-hover') {
            return
          }
          if (
            typeof propertyValue === 'object' &&
            propertyValue !== null &&
            !Array.isArray(propertyValue)
          ) {
            Object.entries(propertyValue).forEach(([shade, shadeValue]) => {
              if (typeof shadeValue === 'string') {
                addBase({
                  ':root': {
                    [`--${prefix}-${property}-${shade}`]: shadeValue,
                  },
                })
              }
            })
          } else if (Array.isArray(propertyValue)) {
            const [size, { lineHeight }] = propertyValue

            addBase({
              ':root': {
                [`--${prefix}-${property}`]: size,
                [`--${prefix}-${property}-line-height`]: lineHeight,
              },
            })
          } else {
            addBase({
              ':root': {
                [`--${prefix}-${property}`]: propertyValue,
              },
            })
          }
        })
      }

      if (theme('colors')) {
        generateCssVars(theme('colors'), 'color')
      }
      if (theme('fontSize')) {
        generateCssVars(theme('fontSize'), 'font-size')
      }
      if (theme('screens')) {
        generateCssVars(theme('screens'), 'screen')
      }
    }),
  ],
}

export default config
